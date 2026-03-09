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
	Chair = "Chair",
	ArmChairA = "Arm Chair A",
	ArmChairB = "Arm Chair B",
	ArmChairC = "Arm Chair C",
	SingleDoor = "Single Door",
	DoubleDoor = "Double Door",
	SlidingDoor = "Sliding Door",
	DirectionArrow = "Direction Arrow",
	ExitSign = "Exit Sign",
	RECT = "rect",
	ELLIPSE = "ellipse",
}

export type PlaceableComponent =
	| CanvasComponentName.Chair
	| CanvasComponentName.ArmChairA
	| CanvasComponentName.ArmChairB
	| CanvasComponentName.ArmChairC
	| CanvasComponentName.SingleDoor
	| CanvasComponentName.DoubleDoor
	| CanvasComponentName.SlidingDoor
	| CanvasComponentName.DirectionArrow
	| CanvasComponentName.ExitSign;

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
	excludeFromUngrouping?: boolean;
	isComponent?: boolean;
}
