import { Canvas, Rect, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";
import { fabricObjectControlDefaults } from "./defaults/objectControlDefaults";

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
			...fabricObjectDefaults,
			...fabricObjectControlDefaults,
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

	const onMouseUp = () => {
		if (!rect || rect.width === 0 || rect.height === 0) {
			if (rect) canvas.remove(rect);
			rect = null;
			return;
		}

		rect.set({
			objectCaching: true,
			left: rect.left + rect.width / 2,
			top: rect.top + rect.height / 2,
			originX: "center",
			originY: "center",
		});

		rect = null;
	};

	return { onMouseDown, onMouseMove, onMouseUp };
};
