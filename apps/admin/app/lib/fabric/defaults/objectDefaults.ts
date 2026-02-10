import type { FabricObject } from "fabric";

export const fabricObjectDefaults: Partial<FabricObject> = {
	fill: "#ffffffff",
	stroke: "#000000ff",
	strokeWidth: 2,
	strokeUniform: true,
	originX: "left",
	originY: "top",
	objectCaching: false,
	selectable: false,
	evented: false,
	snapAngle: 45,
	snapThreshold: 5,
};
