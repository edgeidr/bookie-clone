<template>
	<div class="bg-surface-200 flex flex-1 items-center justify-center">
		<canvas ref="layoutCanvasRef" />
	</div>
</template>

<script setup lang="ts">
	const { initCanvas } = useInjectedCanvas();
	const layoutCanvasRef = useTemplateRef("layoutCanvasRef");

	onMounted(() => {
		initCanvas(layoutCanvasRef.value!);
	});
</script>
