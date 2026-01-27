import type { FabricObject } from "fabric";

export const applyObjectDefaults = (object: FabricObject) => {
	object.cornerStrokeColor = "#000000";
	object.cornerColor = "#f97316";
	object.cornerSize = 8;
	object.transparentCorners = false;
	object.borderColor = "#00000077";
	object.borderDashArray = [5, 2];
	object.padding = 1;
	object.perPixelTargetFind = true;
};
