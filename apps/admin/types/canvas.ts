import type { TPointerEventInfo } from "fabric";

export interface CanvasTool {
	onMouseOver?(event: TPointerEventInfo): void;
	onMouseOut?(event: TPointerEventInfo): void;
	onMouseDown?(event: TPointerEventInfo): void;
	onMouseMove?(event: TPointerEventInfo): void;
	onMouseUp?(event: TPointerEventInfo): void;
	onMouseDoubleClick?(event: TPointerEventInfo): void;
	onActivate?(): void;
	onDeactivate?(): void;
}

export type CanvasToolOrComponent = CanvasToolName | CanvasComponentName;

export enum CanvasToolName {
	SELECT = "select",
	PENTOOL = "penTool",
}

export enum CanvasComponentName {
	SEAT_A = "seatA",
	SEAT_B = "seatB",
	SEAT_C = "seatC",
	TABLE_A = "tableA",
	TABLE_B = "tableB",
	TABLE_C = "tableC",
	MISC_A = "miscA",
	MISC_B = "miscB",
	MISC_C = "miscC",
	MISC_D = "miscD",
	MISC_E = "miscE",
	MISC_F = "miscF",
	MISC_G = "miscG",
	MISC_H = "miscH",
	RECT = "rect",
	ELLIPSE = "ellipse",
}

export type PlaceableComponent =
	| CanvasComponentName.SEAT_A
	| CanvasComponentName.SEAT_B
	| CanvasComponentName.SEAT_C
	| CanvasComponentName.TABLE_A
	| CanvasComponentName.TABLE_B
	| CanvasComponentName.TABLE_C
	| CanvasComponentName.MISC_A
	| CanvasComponentName.MISC_B
	| CanvasComponentName.MISC_C
	| CanvasComponentName.MISC_D
	| CanvasComponentName.MISC_E
	| CanvasComponentName.MISC_F
	| CanvasComponentName.MISC_G
	| CanvasComponentName.MISC_H;

export enum CanvasObjectProperty {
	top = "top",
	left = "left",
	width = "width",
	height = "height",
	angle = "angle",
	strokeColor = "strokeColor",
	strokeWidth = "strokeWidth",
	fillColor = "fillColor",
	borderRadius = "borderRadius",
	rx = "rx",
	ry = "ry",
}
