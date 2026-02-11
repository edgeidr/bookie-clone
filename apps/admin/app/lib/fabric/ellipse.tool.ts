import { Ellipse, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";

export const createEllipseTool = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
): CanvasTool => {
	let ellipse: Ellipse | null = null;
	let start = { x: 0, y: 0 };

	const onMouseDown = (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		const evt = event.e as MouseEvent;
		if (!canvasValue) return;
		if (evt.button !== 0) return;

		start = { ...event.scenePoint };

		ellipse = new Ellipse({
			left: start.x,
			top: start.y,
			rx: 0,
			ry: 0,
			...fabricObjectDefaults,
		});

		canvasValue.add(ellipse);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!canvas.value) return;
		if (!ellipse) return;

		const { x, y } = event.scenePoint;
		const dx = x - start.x;
		const dy = y - start.y;

		ellipse.set({
			rx: Math.abs(dx) / 2,
			ry: Math.abs(dy) / 2,
			left: Math.min(x, start.x),
			top: Math.min(y, start.y),
		});

		canvas.value.requestRenderAll();
	};

	const onMouseUp = (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		const evt = event.e as MouseEvent;
		if (!canvasValue) return;
		if (evt.button !== 0) return;

		if (!ellipse || ellipse.rx === 0 || ellipse.ry === 0) {
			cancel();
			return;
		}

		ellipse.set({ objectCaching: true });
		ellipse = null;

		pushCanvasState();
	};

	const cancel = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		if (ellipse) canvasValue.remove(ellipse);
		ellipse = null;
	};

	const onDeactivate = () => {
		cancel();
	};

	return {
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onDeactivate,
	};
};
