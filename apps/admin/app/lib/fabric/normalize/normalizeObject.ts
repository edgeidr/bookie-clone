import type { Ellipse, FabricObject, Rect } from "fabric";
import { normalizeRect } from "./normalizeRect";
import { normalizeEllipse } from "./normalizeEllipse";

export const normalizeObject = (object: FabricObject) => {
	if (!object || (object.scaleX === 1 && object.scaleY === 1)) return;

	switch (object.type) {
		case "rect":
			normalizeRect(object as Rect);
			break;

		case "ellipse":
			normalizeEllipse(object as Ellipse);
			break;
	}
};
