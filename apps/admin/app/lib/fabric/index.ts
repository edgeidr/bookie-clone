import type { Canvas } from "fabric";
import { createRectTool } from "./rect.tool";
import { CanvasToolName } from "~~/types/canvas";

export const createToolRegistry = (canvas: Canvas) => {
	return {
		[CanvasToolName.RECT]: createRectTool(canvas),
	};
};
