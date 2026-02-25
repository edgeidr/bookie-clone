<template>
	<div ref="canvasWrapper" class="border-surface-400 flex-1 overflow-clip rounded-xl border">
		<canvas ref="layoutCanvasRef" />
	</div>
</template>

<script setup lang="ts">
	const { initCanvas, resizeCanvas, open } = useInjectedCanvas();
	const layoutCanvasRef = useTemplateRef("layoutCanvasRef");
	const canvasWrapper = useTemplateRef("canvasWrapper");

	onMounted(() => {
		initCanvas(layoutCanvasRef.value!);
		useResizeObserver(canvasWrapper, resizeCanvas);

		setTimeout(() => {
			open();
		}, 1000);
	});
</script>
