<template>
	<div
		ref="layoutEditorRef"
		class="relative flex overflow-clip"
		:style="`height: ${remainingHeight}px;`">
		<CanvasPanel />

		<ActionBar />
		<CanvasLayerCard />
		<ObjectInspectorCard v-if="activeObject.object" />
		<CanvasInspectorCard v-else />
	</div>
</template>

<script setup lang="ts">
	import ActionBar from "./_components/ActionBar.vue";
	import CanvasPanel from "./_components/CanvasPanel.vue";
	import CanvasInspectorCard from "./_components/CanvasInspectorCard.vue";
	import ObjectInspectorCard from "./_components/ObjectInspectorCard.vue";
	import CanvasLayerCard from "./_components/CanvasLayerCard.vue";

	const { canvasManager } = defineProps<{ canvasManager: ReturnType<typeof useCanvas> }>();
	const layoutEditorRef = useTemplateRef("layoutEditorRef");
	const PADDING = 40;
	const { height: windowHeight } = useWindowSize();
	const { top } = useElementBounding(layoutEditorRef);
	const { activeObject } = canvasManager;

	const remainingHeight = computed(() => {
		return Math.max(0, windowHeight.value - top.value - PADDING);
	});

	provide(canvasManagerKey, canvasManager);
</script>
