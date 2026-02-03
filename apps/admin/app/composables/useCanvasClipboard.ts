import { ActiveSelection, Canvas, FabricObject } from "fabric";
import { fabricObjectControlDefaults } from "~/lib/fabric/defaults/objectControlDefaults";

export const useCanvasClipboard = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	removeSelection: () => void,
) => {
	const clipboard = ref<FabricObject | ActiveSelection | null>(null);
	const PASTE_OFFSET = 10;
	let pasteCount = 0;

	const copy = async () => {
		if (!canvas.value) return;

		const activeObject = canvas.value.getActiveObject();
		if (!activeObject) return;

		clipboard.value = await activeObject.clone();
		pasteCount = 0;
	};

	const cut = async () => {
		if (!canvas.value) return;

		const activeObject = canvas.value.getActiveObject();
		if (!activeObject) return;

		await copy();
		removeSelection();
	};

	const paste = async () => {
		if (!canvas.value) return;
		if (!clipboard.value) return;

		canvas.value.discardActiveObject();

		const cloned = await clipboard.value.clone();

		if (cloned.isType("activeselection")) {
			const selection = cloned as ActiveSelection;

			selection.forEachObject((object) => {
				if (!canvas.value) return;

				applyPasteDefaults(object);
				canvas.value.add(object);
			});

			canvas.value.setActiveObject(
				new ActiveSelection(selection.getObjects(), { canvas: canvas.value }),
			);
		} else {
			applyPasteDefaults(cloned);
			canvas.value.add(cloned);
			canvas.value.setActiveObject(cloned);
		}

		canvas.value.requestRenderAll();
		pasteCount++;

		pushCanvasState();
	};

	const applyPasteDefaults = (object: FabricObject) => {
		const offset = PASTE_OFFSET * (pasteCount + 1);

		object.set({
			left: (object.left ?? 0) + offset,
			top: (object.top ?? 0) + offset,
			...fabricObjectControlDefaults,
		});

		object.setCoords();
	};

	const canPaste = computed(() => clipboard.value !== null);

	return { copy, cut, paste, canPaste };
};
