<template>
	<div
		ref="layoutEditorRef"
		class="flex w-full gap-8 overflow-hidden"
		:style="`height: ${remainingHeight}px;`">
		<div class="flex flex-1 flex-col overflow-hidden">
			<ActionBar />
			<CanvasPanel />
		</div>

		<div class="mt-20 w-96">
			<ObjectInspectorCard v-if="activeObject.object" />
			<CanvasInspectorCard v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
	import ActionBar from "./_components/ActionBar.vue";
	import CanvasPanel from "./_components/CanvasPanel.vue";
	import CanvasInspectorCard from "./_components/CanvasInspectorCard.vue";
	import ObjectInspectorCard from "./_components/ObjectInspectorCard.vue";

	const { canvasManager } = defineProps<{ canvasManager: ReturnType<typeof useCanvas> }>();
	const layoutEditorRef = useTemplateRef("layoutEditorRef");
	const PADDING = 28;
	const { height: windowHeight } = useWindowSize();
	const { top } = useElementBounding(layoutEditorRef);
	const { activeObject } = canvasManager;

	const remainingHeight = computed(() => {
		return Math.max(0, windowHeight.value - top.value - PADDING);
	});

	provide(canvasManagerKey, canvasManager);
</script>
