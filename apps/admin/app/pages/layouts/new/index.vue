<template>
	<LayoutEditor :canvasManager />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: "admin",
		titleKey: "pages.layoutsNew.title",
	});

	const canvasManager = useCanvas();
</script>
