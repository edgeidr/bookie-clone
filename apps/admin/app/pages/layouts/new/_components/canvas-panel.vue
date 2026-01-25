<template>
	<div class="bg-surface-200 flex flex-1 items-center justify-center">
		<canvas ref="layoutCanvas" />
	</div>
	{{ activeToolName }}
</template>

<script setup lang="ts">
	import { Canvas } from "fabric";
	import { createToolRegistry } from "~/lib/fabric";
	import { CanvasToolName, type CanvasTool } from "~~/types/canvas";

	const layoutCanvas = useTemplateRef("layoutCanvas");
	const activeToolName = useState<CanvasToolName>("activeToolName", () => CanvasToolName.RECT);
	let tools: ReturnType<typeof createToolRegistry>;
	let canvas: Canvas;
	let activeTool: CanvasTool | undefined;

	const initCanvas = () => {
		canvas = new Canvas(layoutCanvas.value!, { selection: false, backgroundColor: "#ffffff" });
		canvas.setDimensions({
			width: 800,
			height: 600,
		});
		canvas.requestRenderAll();

		canvas.on("mouse:down", (e) => activeTool?.onMouseDown?.(e));
		canvas.on("mouse:move", (e) => activeTool?.onMouseMove?.(e));
		canvas.on("mouse:up", (e) => activeTool?.onMouseUp?.(e));

		tools = createToolRegistry(canvas);
		activeTool = tools[activeToolName.value];
	};

	onMounted(() => {
		initCanvas();
	});
</script>
