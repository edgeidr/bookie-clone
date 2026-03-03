import { Pattern, Point, type Canvas } from "fabric";
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
			if (zoom < 0.1) zoom = 0.1;

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
			canvasValue.setCursor("move");
			canvasValue.discardActiveObject();
			canvasValue.requestRenderAll();
		});

		canvasValue.on("mouse:move", function (options) {
			if (!isDragging.value) return;

			const event = options.e as MouseEvent;
			const dx = event.clientX - lastPos.x;
			const dy = event.clientY - lastPos.y;

			canvasValue.setCursor("move");
			canvasValue.relativePan(new Point(dx, dy));

			lastPos.x = event.clientX;
			lastPos.y = event.clientY;

			canvasValue.requestRenderAll();
		});

		canvasValue.on("mouse:up", function (options) {
			const event = options.e as MouseEvent;
			if (event.button !== 1) return;

			canvasValue.setCursor("default");
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

	const setCheckeredBackground = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		// const size = 40;
		// const patternCanvas = document.createElement("canvas");

		// patternCanvas.width = size * 2;
		// patternCanvas.height = size * 2;

		// const ctx = patternCanvas.getContext("2d");
		// if (!ctx) return;

		// ctx.fillStyle = "#f8f8f8";
		// ctx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

		// ctx.fillStyle = "#d9d9d9";
		// ctx.fillRect(0, 0, size, size);
		// ctx.fillRect(size, size, size, size);

		// const pattern = new Pattern({
		// 	source: patternCanvas,
		// 	repeat: "repeat",
		// });

		canvasValue.backgroundColor = "oklch(97% 0.014 254.604)";
		canvasValue.setZoom(0.5);
		canvasValue.requestRenderAll();
	};

	onMounted(() => {
		setCheckeredBackground();
		bindCanvasZoomEvent();
		bindCanvasPanEvent();
		resizeCanvas();
	});

	return { resizeCanvas };
};
