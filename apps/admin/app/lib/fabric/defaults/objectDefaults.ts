import type { FabricObject } from "fabric";

export const fabricObjectDefaults: Partial<FabricObject> = {
	fill: "#ffffffff",
	stroke: "#000000ff",
	strokeWidth: 1,
	strokeUniform: true,
	originX: "left",
	originY: "top",
	objectCaching: false,
	selectable: false,
	evented: false,
};
