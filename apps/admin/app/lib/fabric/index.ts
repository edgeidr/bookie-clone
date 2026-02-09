import type { Canvas } from "fabric";
import { createRectTool } from "./rect.tool";
import {
	CanvasComponentName,
	CanvasToolName,
	type CanvasTool,
	type PlaceableComponent,
} from "~~/types/canvas";
import { createEllipseTool } from "./ellipse.tool";
import { createSelectTool } from "./select.tool";
import { createPolylineTool } from "./polyline.tool";
import { createPlaceTool } from "./place.tool";

export const createToolRegistry = (canvas: Ref<Canvas | null>, pushCanvasState: () => void) => {
	const placeableComponents: CanvasComponentName[] = [
		CanvasComponentName.SEAT_A,
		CanvasComponentName.SEAT_B,
		CanvasComponentName.SEAT_C,
		CanvasComponentName.TABLE_A,
		CanvasComponentName.TABLE_B,
		CanvasComponentName.TABLE_C,
		CanvasComponentName.MISC_A,
		CanvasComponentName.MISC_B,
		CanvasComponentName.MISC_C,
		CanvasComponentName.MISC_D,
	] as const;

	const placeableTools = Object.fromEntries(
		placeableComponents.map((name) => [name, createPlaceTool(canvas, name, pushCanvasState)]),
	) as Record<PlaceableComponent, CanvasTool>;

	return {
		[CanvasToolName.SELECT]: createSelectTool(canvas),
		[CanvasToolName.PENTOOL]: createPolylineTool(canvas, pushCanvasState),
		[CanvasComponentName.RECT]: createRectTool(canvas, pushCanvasState),
		[CanvasComponentName.ELLIPSE]: createEllipseTool(canvas, pushCanvasState),
		...placeableTools,
	};
};
