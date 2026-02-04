import type { Canvas } from "fabric";
import type { CanvasToolOrComponent } from "~~/types/canvas";

export const useCanvasEditing = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	activeToolName: Ref<CanvasToolOrComponent>,
) => {
	const removeSelection = () => {
		if (!canvas.value) return;

		const activeObjects = canvas.value.getActiveObjects();
		if (!activeObjects.length) return;

		activeObjects.forEach((object) => {
			if (!canvas.value) return;
			canvas.value.remove(object);
		});
		canvas.value.discardActiveObject();
		canvas.value.requestRenderAll();

		pushCanvasState();
	};

	const selectTool = (tool: CanvasToolOrComponent) => {
		activeToolName.value = tool;
	};

	return { removeSelection, selectTool };
};
