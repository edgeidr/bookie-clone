import type { Canvas, TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { isPolyEditable, togglePolyEditing } from "./utils/polyEditing";

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
			object.objectCaching = true;
		});

		canvas.requestRenderAll();
	};

	const onMouseDoubleClick = (event: TPointerEventInfo) => {
		const { target } = event;

		if (!target) return;
		if (!isPolyEditable(target)) return;

		togglePolyEditing(target);
		canvas.setActiveObject(target);
		canvas.requestRenderAll();
	};

	return {
		onActivate,
		onDeactivate,
		onMouseDoubleClick,
	};
};
