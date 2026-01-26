import { Canvas, Line, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";

export const createLineTool = (canvas: Canvas): CanvasTool => {
	let line: Line | null = null;
	let start = { x: 0, y: 0 };
	let strokeWidth = 1;

	const onMouseDown = (event: TPointerEventInfo) => {
		start = { ...event.scenePoint };

		line = new Line([start.x, start.y, start.x, start.y], {
			stroke: "#000000ff",
			strokeWidth,
			objectCaching: strokeWidth > 1,
		});

		canvas.add(line);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!line) return;

		const { x, y } = event.scenePoint;

		line.set({
			x2: x,
			y2: y,
		});

		canvas.requestRenderAll();
	};

	const onMouseUp = (event: TPointerEventInfo) => {
		line = null;
	};

	return { onMouseDown, onMouseMove, onMouseUp };
};
