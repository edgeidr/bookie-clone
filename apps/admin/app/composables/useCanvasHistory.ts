import type { Canvas } from "fabric";

export const useCanvasHistory = () => {
	const canvasSnapshot = ref<string | null>(null);
	const { history, undo, redo, canUndo, canRedo, last, pause, resume } =
		useRefHistory(canvasSnapshot);

	const pushCanvasState = (canvas: Canvas) => {
		canvasSnapshot.value = JSON.stringify(canvas.toJSON());
	};

	const undoCanvas = (canvas: Canvas) => {
		undo();
		restore(canvas);
	};

	const redoCanvas = (canvas: Canvas) => {
		redo();
		restore(canvas);
	};

	const restore = async (canvas: Canvas) => {
		const snapshot = last.value.snapshot;
		if (!snapshot) return;

		pause();
		await canvas.loadFromJSON(snapshot);
		canvas.requestRenderAll();
		resume();
	};

	return { pushCanvasState, undoCanvas, redoCanvas, canRedo, canUndo, history };
};
