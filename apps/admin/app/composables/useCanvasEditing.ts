import type { Canvas } from "fabric";

export const useCanvasEditing = (canvas: Ref<Canvas | null>) => {
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
	};

	return { removeSelection };
};
