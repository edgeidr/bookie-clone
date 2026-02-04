import { Point, type Canvas } from "fabric";
import { CanvasToolName } from "~~/types/canvas";

export const useCanvasViewport = (
	canvas: Ref<Canvas | null>,
	canvasEditing: ReturnType<typeof useCanvasEditing>,
) => {
	const isDragging = ref(false);
	const lastPos = reactive<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });

	const bindCanvasZoomEvent = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		canvasValue.on("mouse:wheel", function (options) {
			const event = options.e as WheelEvent;
			if (!event.ctrlKey) return;

			const delta = event.deltaY;
			let zoom = canvasValue.getZoom();

			zoom *= 0.999 ** delta;
			if (zoom > 20) zoom = 20;
			if (zoom < 0.01) zoom = 0.01;

			canvasValue.zoomToPoint(new Point(event.offsetX, event.offsetY), zoom);
			event.preventDefault();
			event.stopPropagation();
		});
	};

	const bindCanvasPanEvent = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		canvasValue.on("mouse:down", function (options) {
			const event = options.e as MouseEvent;
			if (event.button !== 1) return;

			isDragging.value = true;
			lastPos.x = event.clientX;
			lastPos.y = event.clientY;

			canvasEditing.selectTool(CanvasToolName.SELECT);
			canvasValue.discardActiveObject();
			canvasValue.requestRenderAll();
		});

		canvasValue.on("mouse:move", function (options) {
			if (!isDragging.value) return;

			const event = options.e as MouseEvent;
			const dx = event.clientX - lastPos.x;
			const dy = event.clientY - lastPos.y;

			canvasValue.relativePan(new Point(dx, dy));

			lastPos.x = event.clientX;
			lastPos.y = event.clientY;

			canvasValue.requestRenderAll();
		});

		canvasValue.on("mouse:up", function (options) {
			const event = options.e as MouseEvent;
			if (event.button !== 1) return;

			isDragging.value = false;
		});
	};

	const resizeCanvas = () => {
		if (!canvas.value) return;

		const canvasValue = canvas.value;
		const { clientWidth, clientHeight } = canvasValue.wrapperEl.parentElement!;

		canvasValue.setDimensions({
			width: clientWidth,
			height: clientHeight,
		});

		canvasValue.requestRenderAll();
	};

	onMounted(() => {
		bindCanvasZoomEvent();
		bindCanvasPanEvent();
		resizeCanvas();
	});

	return { resizeCanvas };
};
