import type { Canvas } from "fabric";

export const useCanvasHistory = (canvas: Ref<Canvas | null>) => {
	const canvasSnapshot = ref<string | null>(null);
	const { undo, redo, canUndo, canRedo, pause, resume, last } = useThrottledRefHistory(
		canvasSnapshot,
		{ throttle: 500, capacity: 100 },
	);

	const pushCanvasState = () => {
		if (!canvas.value) return;
		canvasSnapshot.value = JSON.stringify(canvas.value.toJSON());
	};

	const undoCanvas = () => {
		if (!canvas.value) return;

		undo();
		restore();
	};

	const redoCanvas = () => {
		if (!canvas.value) return;

		redo();
		restore();
	};

	const restore = async () => {
		if (!canvas.value) return;

		const snapshot = last.value.snapshot;

		pause();

		if (!snapshot) {
			canvas.value.getObjects().forEach((object) => canvas.value!.remove(object));
		} else {
			await canvas.value.loadFromJSON(snapshot);
		}

		canvas.value.requestRenderAll();
		resume();
	};

	return { pushCanvasState, undoCanvas, redoCanvas, canRedo, canUndo, last };
};
