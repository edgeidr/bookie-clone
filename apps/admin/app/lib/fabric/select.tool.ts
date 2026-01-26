import type { Canvas } from "fabric";
import type { CanvasTool } from "~~/types/canvas";

export const createSelectTool = (canvas: Canvas): CanvasTool => {
	const onActivate = () => {
		canvas.selection = true;
		canvas.hoverCursor = "pointer";
		canvas.forEachObject((object) => {
			object.selectable = true;
			object.evented = true;
			object.setCoords();
		});
	};

	const onDeactivate = () => {
		canvas.selection = false;
		canvas.discardActiveObject();
		canvas.forEachObject((object) => {
			object.selectable = false;
			object.evented = false;
		});

		canvas.requestRenderAll();
	};

	return {
		onActivate,
		onDeactivate,
	};
};
