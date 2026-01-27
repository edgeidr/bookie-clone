<template>
	<div class="bg-surface-200 flex flex-1 items-center justify-center">
		<canvas ref="layoutCanvas" />
	</div>
</template>

<script setup lang="ts">
	import { Canvas } from "fabric";
	import { createToolRegistry } from "~/lib/fabric";
	import { CanvasToolName, type CanvasTool } from "~~/types/canvas";

	const layoutCanvas = useTemplateRef("layoutCanvas");
	const activeToolName = useState<CanvasToolName>("activeToolName", () => CanvasToolName.SELECT);
	let tools: ReturnType<typeof createToolRegistry>;
	let canvas: Canvas;
	let activeTool: CanvasTool | undefined;

	const initCanvas = () => {
		canvas = new Canvas(layoutCanvas.value!, { selection: false, backgroundColor: "#ffffff" });
		canvas.setDimensions({ width: 800, height: 600 });
		canvas.requestRenderAll();

		tools = createToolRegistry(canvas);
		activeTool?.onDeactivate?.();
		activeTool = tools[activeToolName.value];
		activeTool.onActivate?.();

		canvas.on("mouse:down", (e) => activeTool?.onMouseDown?.(e));
		canvas.on("mouse:move", (e) => activeTool?.onMouseMove?.(e));
		canvas.on("mouse:up", (e) => activeTool?.onMouseUp?.(e));
		canvas.on("mouse:dblclick", (e) => activeTool?.onMouseDoubleClick?.(e));
	};

	onMounted(() => {
		initCanvas();
	});

	watch(activeToolName, (tool) => {
		activeTool?.onDeactivate?.();
		activeTool = tools[tool];
		activeTool?.onActivate?.();
	});
</script>
