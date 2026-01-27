import { Ellipse, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { applyObjectDefaults } from "./defaults/objectDefaults";

export const createEllipseTool = (canvas: Canvas): CanvasTool => {
	let ellipse: Ellipse | null = null;
	let start = { x: 0, y: 0 };

	const onMouseDown = (event: TPointerEventInfo) => {
		start = { ...event.scenePoint };

		ellipse = new Ellipse({
			left: start.x,
			top: start.y,
			rx: 0,
			ry: 0,
			fill: "#ffffffff",
			stroke: "#000000ff",
			strokeWidth: 1,
			strokeUniform: true,
			originX: "left",
			originY: "top",
			objectCaching: false,
		});

		applyObjectDefaults(ellipse);
		canvas.add(ellipse);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
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

		canvas.requestRenderAll();
	};

	const onMouseUp = (event: TPointerEventInfo) => {
		if (ellipse) ellipse.set({ objectCaching: true });
		ellipse = null;
	};

	return {
		onMouseDown,
		onMouseMove,
		onMouseUp,
	};
};
