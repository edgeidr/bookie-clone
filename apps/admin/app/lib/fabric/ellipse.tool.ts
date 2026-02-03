import { Ellipse, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";
import { fabricObjectControlDefaults } from "./defaults/objectControlDefaults";

export const createEllipseTool = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
): CanvasTool => {
	let ellipse: Ellipse | null = null;
	let start = { x: 0, y: 0 };

	const onMouseDown = (event: TPointerEventInfo) => {
		if (!canvas.value) return;

		start = { ...event.scenePoint };

		ellipse = new Ellipse({
			left: start.x,
			top: start.y,
			rx: 0,
			ry: 0,
			...fabricObjectDefaults,
			...fabricObjectControlDefaults,
		});

		canvas.value.add(ellipse);
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

	const onMouseUp = () => {
		if (!canvas.value) return;

		if (!ellipse || ellipse.rx === 0 || ellipse.ry === 0) {
			if (ellipse) canvas.value.remove(ellipse);
			ellipse = null;
			return;
		}

		ellipse.set({
			objectCaching: true,
			left: ellipse.left + ellipse.rx,
			top: ellipse.top + ellipse.ry,
			originX: "center",
			originY: "center",
		});

		ellipse = null;

		pushCanvasState();
	};

	return {
		onMouseDown,
		onMouseMove,
		onMouseUp,
	};
};
