import { Canvas, Rect, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";

export const createRectTool = (canvas: Canvas): CanvasTool => {
	let rect: Rect | null = null;
	let start = { x: 0, y: 0 };

	const onMouseDown = (event: TPointerEventInfo) => {
		start = { ...event.scenePoint };

		rect = new Rect({
			left: start.x,
			top: start.y,
			width: 0,
			height: 0,
			fill: "#ffffffff",
			stroke: "#000000ff",
			strokeWidth: 1,
			originX: "left",
			originY: "top",
			objectCaching: false,
		});

		canvas.add(rect);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!rect) return;

		const { x, y } = event.scenePoint;

		rect.set({
			width: Math.abs(x - start.x),
			height: Math.abs(y - start.y),
			left: Math.min(x, start.x),
			top: Math.min(y, start.y),
		});

		canvas.requestRenderAll();
	};

	const onMouseUp = (event: TPointerEventInfo) => {
		if (rect) rect.set({ objectCaching: true });
		rect = null;
	};

	return { onMouseDown, onMouseMove, onMouseUp };
};
