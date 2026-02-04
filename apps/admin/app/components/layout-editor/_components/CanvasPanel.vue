<template>
	<div ref="canvasWrapper" class="flex-1 overflow-hidden rounded-xl">
		<canvas ref="layoutCanvasRef" />
	</div>
</template>

<script setup lang="ts">
	const { initCanvas, resizeCanvas } = useInjectedCanvas();
	const layoutCanvasRef = useTemplateRef("layoutCanvasRef");
	const canvasWrapper = useTemplateRef("canvasWrapper");

	onMounted(() => {
		initCanvas(layoutCanvasRef.value!);
		useResizeObserver(canvasWrapper, resizeCanvas);
	});
</script>
