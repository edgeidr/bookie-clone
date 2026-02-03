import type { Canvas } from "fabric";
import { createRectTool } from "./rect.tool";
import { CanvasComponentName, CanvasToolName } from "~~/types/canvas";
import { createEllipseTool } from "./ellipse.tool";
import { createSelectTool } from "./select.tool";
import { createPolylineTool } from "./polyline.tool";

export const createToolRegistry = (canvas: Ref<Canvas | null>, pushCanvasState: () => void) => {
	return {
		[CanvasToolName.SELECT]: createSelectTool(canvas),
		[CanvasToolName.PENTOOL]: createPolylineTool(canvas, pushCanvasState),
		[CanvasComponentName.RECT]: createRectTool(canvas, pushCanvasState),
		[CanvasComponentName.ELLIPSE]: createEllipseTool(canvas, pushCanvasState),
		[CanvasComponentName.SEAT_A]: undefined,
		[CanvasComponentName.SEAT_B]: undefined,
		[CanvasComponentName.SEAT_C]: undefined,
		[CanvasComponentName.SEAT_D]: undefined,
		[CanvasComponentName.TABLE_A]: undefined,
		[CanvasComponentName.TABLE_B]: undefined,
		[CanvasComponentName.TABLE_C]: undefined,
		[CanvasComponentName.MISC_A]: undefined,
		[CanvasComponentName.MISC_B]: undefined,
		[CanvasComponentName.MISC_C]: undefined,
		[CanvasComponentName.MISC_D]: undefined,
		[CanvasComponentName.MISC_E]: undefined,
		[CanvasComponentName.MISC_F]: undefined,
		[CanvasComponentName.MISC_G]: undefined,
		[CanvasComponentName.MISC_H]: undefined,
	};
};
