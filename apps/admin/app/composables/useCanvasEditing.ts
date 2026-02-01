import type { Canvas } from "fabric";

export const useCanvasEditing = () => {
	const removeSelection = (canvas: Canvas) => {
		const activeObjects = canvas.getActiveObjects();
		if (!activeObjects.length) return;

		activeObjects.forEach((object) => canvas.remove(object));
		canvas.discardActiveObject();
		canvas.requestRenderAll();
	};

	return { removeSelection };
};
