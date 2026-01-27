import { controlsUtils, FabricObject, Polygon, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";

export const createSelectTool = (canvas: Canvas): CanvasTool => {
	const POLY_EDIT_SUPPORTED_TOOLS = ["polygon", "polyline"];
	let polyEditEnabled = false;

	const togglePolyEditing = (object: FabricObject, enable = !polyEditEnabled) => {
		if (!POLY_EDIT_SUPPORTED_TOOLS.includes(object.type)) return;
		polyEditEnabled = enable;

		const poly = object as Polygon;

		if (polyEditEnabled) {
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

	const onActivate = () => {
		canvas.selection = true;
		canvas.hoverCursor = "pointer";
		canvas.forEachObject((object) => {
			object.selectable = true;
			object.evented = true;
			object.setCoords();
		});
	};

	const onDeactivate = () => {
		canvas.selection = false;
		canvas.discardActiveObject();
		canvas.forEachObject((object) => {
			object.selectable = false;
			object.evented = false;
			object.objectCaching = true;
			togglePolyEditing(object, false);
		});

		canvas.requestRenderAll();
	};

	const onMouseDoubleClick = (event: TPointerEventInfo) => {
		const { target } = event;

		if (!target) return;

		if (POLY_EDIT_SUPPORTED_TOOLS.includes(target.type)) {
			togglePolyEditing(target);
			canvas.setActiveObject(target);
			canvas.requestRenderAll();
		}
	};

	return {
		onActivate,
		onDeactivate,
		onMouseDoubleClick,
	};
};
