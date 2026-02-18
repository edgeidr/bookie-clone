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

export const createToolRegistry = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	updateLayers: () => void,
) => {
	const placeableComponents: CanvasComponentName[] = [
		CanvasComponentName.Chair,
		CanvasComponentName.ArmChairA,
		CanvasComponentName.ArmChairB,
		CanvasComponentName.ArmChairC,
		CanvasComponentName.SingleDoor,
		CanvasComponentName.DoubleDoor,
		CanvasComponentName.SlidingDoor,
		CanvasComponentName.DirectionArrow,
		CanvasComponentName.ExitSign,
	] as const;

	const placeableTools = Object.fromEntries(
		placeableComponents.map((name) => [
			name,
			createPlaceTool(canvas, name, pushCanvasState, updateLayers),
		]),
	) as Record<PlaceableComponent, CanvasTool>;

	return {
		[CanvasToolName.SELECT]: createSelectTool(canvas),
		[CanvasToolName.PENTOOL]: createPolylineTool(canvas, pushCanvasState, updateLayers),
		[CanvasComponentName.RECT]: createRectTool(canvas, pushCanvasState, updateLayers),
		[CanvasComponentName.ELLIPSE]: createEllipseTool(canvas, pushCanvasState, updateLayers),
		...placeableTools,
	};
};
