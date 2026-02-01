import { ActiveSelection, Canvas, FabricObject } from "fabric";
import { fabricObjectControlDefaults } from "~/lib/fabric/defaults/objectControlDefaults";

const PASTE_OFFSET = 10;
const clipboard = ref<FabricObject | ActiveSelection | null>(null);
let pasteCount = 0;

export const useCanvasClipboard = () => {
	const copy = async (canvas: Canvas) => {
		const activeObject = canvas.getActiveObject();
		if (!activeObject) return;

		clipboard.value = await activeObject.clone();
		pasteCount = 0;
	};

	const cut = async (canvas: Canvas) => {
		const activeObject = canvas.getActiveObject();
		if (!activeObject) return;

		await copy(canvas);

		if (activeObject.isType("activeselection")) {
			(activeObject as ActiveSelection).forEachObject((object) => canvas.remove(object));
		} else {
			canvas.remove(activeObject);
		}

		canvas.discardActiveObject();
		canvas.requestRenderAll();
	};

	const paste = async (canvas: Canvas) => {
		if (!clipboard.value) return;
		canvas.discardActiveObject();

		const cloned = await clipboard.value.clone();

		if (cloned.isType("activeselection")) {
			const selection = cloned as ActiveSelection;

			selection.forEachObject((object) => {
				applyPasteDefaults(object);
				canvas.add(object);
			});

			canvas.setActiveObject(new ActiveSelection(selection.getObjects(), { canvas }));
		} else {
			applyPasteDefaults(cloned);
			canvas.add(cloned);
			canvas.setActiveObject(cloned);
		}

		canvas.requestRenderAll();
		pasteCount++;
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
