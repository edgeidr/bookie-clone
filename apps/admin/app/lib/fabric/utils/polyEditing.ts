import { Canvas, controlsUtils, type FabricObject, type Polygon } from "fabric";

export const togglePolyEditing = (object: FabricObject, enable?: boolean) => {
	if (!isPolyEditable(object)) return;

	const poly = object as Polygon;
	const shouldEnable = enable ?? poly.cornerStyle !== "circle";

	if (shouldEnable) {
		poly.cornerStyle = "circle";
		poly.hasBorders = false;
		poly.controls = controlsUtils.createPolyControls(poly, {});
	} else {
		poly.cornerStyle = "rect";
		poly.hasBorders = true;
		poly.controls = controlsUtils.createObjectDefaultControls();
	}

	poly.objectCaching = false;
	poly.setCoords();
};

export const disablePolyEditingForAll = (canvas: Canvas) => {
	canvas.forEachObject((object) => {
		if (!isPolyEditable(object)) return;
		togglePolyEditing(object, false);
	});
};

export const isPolyEditable = (object: FabricObject) => {
	const POLY_EDIT_SUPPORTED_TOOLS = ["polygon", "polyline"];
	return POLY_EDIT_SUPPORTED_TOOLS.includes(object.type);
};

export const handlePolyEditingForObject = (canvas: Canvas, object: FabricObject) => {
	disablePolyEditingForAll(canvas);
	if (isPolyEditable(object)) togglePolyEditing(object, true);
};
