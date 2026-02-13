import type { FabricObject, TPointerEventInfo } from "fabric";

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
	SEAT_A = "Seat A",
	SEAT_B = "Seat B",
	SEAT_C = "Seat C",
	TABLE_A = "Table A",
	TABLE_B = "Table B",
	TABLE_C = "Table C",
	MISC_A = "Misc A",
	MISC_B = "Misc B",
	MISC_C = "Misc C",
	MISC_D = "Misc D",
	MISC_E = "Misc E",
	MISC_F = "Misc F",
	MISC_G = "Misc G",
	MISC_H = "Misc H",
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

export interface CanvasProperties {
	isSnappingEnabled: boolean;
}

export interface FabricObjectExtended extends FabricObject {
	id?: string;
	label?: string;
	zIndex?: number;
	locked?: boolean;
	excludeFromSnap?: boolean;
	excludeFromLayers?: boolean;
}
