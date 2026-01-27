import type { Canvas } from "fabric";
import { createRectTool } from "./rect.tool";
import { CanvasToolName } from "~~/types/canvas";
import { createEllipseTool } from "./ellipse.tool";
import { createSelectTool } from "./select.tool";
import { createPolylineTool } from "./polyline.tool";

export const createToolRegistry = (canvas: Canvas) => {
	return {
		[CanvasToolName.RECT]: createRectTool(canvas),
		[CanvasToolName.ELLIPSE]: createEllipseTool(canvas),
		[CanvasToolName.SELECT]: createSelectTool(canvas),
		[CanvasToolName.PENTOOL]: createPolylineTool(canvas),
	};
};
