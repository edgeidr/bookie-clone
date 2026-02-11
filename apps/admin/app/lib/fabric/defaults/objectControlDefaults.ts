import { Control, controlsUtils, type FabricObject } from "fabric";

export const fabricObjectControlDefaults: Partial<FabricObject> = {
	cornerStrokeColor: "#000000",
	cornerColor: "#f97316",
	cornerSize: 8,
	transparentCorners: false,
	borderColor: "#00000077",
	borderDashArray: [5, 2],
	padding: 1,
	perPixelTargetFind: true,
	borderOpacityWhenMoving: 0,
	controls: {
		...controlsUtils.createObjectDefaultControls(),
		mtr: new Control({
			x: 0,
			y: -0.5,
			actionHandler: controlsUtils.rotationWithSnapping,
			cursorStyleHandler: controlsUtils.rotationStyleHandler,
			cursorStyle: "grab",
			offsetY: -40,
			withConnection: true,
			actionName: "rotate",
		}),
	},
};
