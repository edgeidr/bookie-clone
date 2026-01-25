import type { TPointerEventInfo } from "fabric";

export interface CanvasTool {
	onMouseDown?(event: TPointerEventInfo): void;
	onMouseMove?(event: TPointerEventInfo): void;
	onMouseUp?(event: TPointerEventInfo): void;
}

export enum CanvasToolName {
	RECT = "rect",
	ELLIPSE = "ellipse",
}
