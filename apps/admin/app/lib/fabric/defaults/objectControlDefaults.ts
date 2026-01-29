import type { FabricObject } from "fabric";

export const fabricObjectControlDefaults: Partial<FabricObject> = {
	cornerStrokeColor: "#000000",
	cornerColor: "#f97316",
	cornerSize: 8,
	transparentCorners: false,
	borderColor: "#00000077",
	borderDashArray: [5, 2],
	padding: 1,
	perPixelTargetFind: true,
};
