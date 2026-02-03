import type { Canvas, TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { isPolyEditable, togglePolyEditing } from "./utils/polyEditing";

export const createSelectTool = (canvas: Ref<Canvas | null>): CanvasTool => {
	const onActivate = () => {
		if (!canvas.value) return;

		canvas.value.selection = true;
		canvas.value.hoverCursor = "pointer";
		canvas.value.forEachObject((object) => {
			object.selectable = true;
			object.evented = true;
			object.setCoords();
		});
	};

	const onDeactivate = () => {
		if (!canvas.value) return;

		canvas.value.selection = false;
		canvas.value.discardActiveObject();
		canvas.value.forEachObject((object) => {
			object.selectable = false;
			object.evented = false;
			object.objectCaching = true;
		});

		canvas.value.requestRenderAll();
	};

	const onMouseDoubleClick = (event: TPointerEventInfo) => {
		if (!canvas.value) return;

		const { target } = event;

		if (!target) return;
		if (!isPolyEditable(target)) return;

		togglePolyEditing(target);
		canvas.value.setActiveObject(target);
		canvas.value.requestRenderAll();
	};

	return {
		onActivate,
		onDeactivate,
		onMouseDoubleClick,
	};
};
