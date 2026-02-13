import type { Canvas } from "fabric";
import type { CanvasToolOrComponent } from "~~/types/canvas";

export const useCanvasEditing = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	updateLayers: () => void,
	activeToolName: Ref<CanvasToolOrComponent>,
) => {
	const moveSelection = (deltaX: number, deltaY: number) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject = canvasValue.getActiveObject();
		if (!activeObject) return;

		activeObject.left += deltaX;
		activeObject.top += deltaY;
		activeObject.setCoords();

		canvasValue.requestRenderAll();
		canvasValue.fire("object:modified", { target: activeObject });

		pushCanvasState();
	};

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

		updateLayers();
		pushCanvasState();
	};

	const selectTool = (tool: CanvasToolOrComponent) => {
		activeToolName.value = tool;
	};

	return { moveSelection, removeSelection, selectTool };
};
