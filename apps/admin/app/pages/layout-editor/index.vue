<template>
	<LayoutEditor :canvasManager />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: "admin",
		titleKey: "pages.layoutEditor.title",
	});

	const canvasManager = useCanvas();
</script>
