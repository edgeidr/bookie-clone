import { Canvas, FabricObject, Rect, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";

export const createRectTool = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	updateLayers: () => void,
): CanvasTool => {
	const { t } = useI18n();
	let rect: Rect | null = null;
	let start = { x: 0, y: 0 };

	const onMouseDown = (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		const evt = event.e as MouseEvent;
		if (!canvasValue) return;
		if (evt.button !== 0) return;

		start = { ...event.scenePoint };

		rect = new Rect({
			left: start.x,
			top: start.y,
			width: 0,
			height: 0,
			...fabricObjectDefaults,
		});

		canvasValue.add(rect);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!canvas.value) return;
		if (!rect) return;

		const { x, y } = event.scenePoint;

		rect.set({
			width: Math.abs(x - start.x),
			height: Math.abs(y - start.y),
			left: Math.min(x, start.x),
			top: Math.min(y, start.y),
		});

		canvas.value.requestRenderAll();
	};

	const onMouseUp = (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		const evt = event.e as MouseEvent;
		if (!canvasValue) return;
		if (evt.button !== 0) return;

		if (!rect || rect.width === 0 || rect.height === 0) {
			cancel();
			return;
		}

		rect.set({ objectCaching: true, label: t("common.ui.rectangle") });
		rect = null;

		updateLayers();
		pushCanvasState();
	};

	const cancel = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		if (rect) canvasValue.remove(rect);
		rect = null;
	};

	const onDeactivate = () => {
		cancel();
	};

	return { onMouseDown, onMouseMove, onMouseUp, onDeactivate };
};
