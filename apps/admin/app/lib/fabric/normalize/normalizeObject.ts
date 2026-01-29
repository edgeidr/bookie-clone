import type { FabricObject, Rect } from "fabric";
import { normalizeRect } from "./normalizeRect";

export const normalizeObject = (object: FabricObject) => {
	if (!object || (object.scaleX === 1 && object.scaleY === 1)) return;

	switch (object.type) {
		case "rect":
			normalizeRect(object as Rect);
			break;
	}

	object.setCoords();
};
