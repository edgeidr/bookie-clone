import type { TPointerEventInfo } from "fabric";

export interface CanvasTool {
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
	SEAT_D = "seatD",
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
