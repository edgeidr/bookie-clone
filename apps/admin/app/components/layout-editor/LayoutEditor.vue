<template>
	<div
		ref="layoutEditorRef"
		class="flex w-full gap-8 overflow-hidden"
		:style="`height: ${remainingHeight}px;`">
		<div class="flex flex-1 flex-col">
			<ActionBar />
			<CanvasPanel />
		</div>

		<div class="mt-20 flex w-96 flex-col gap-8">
			<InspectorCard v-if="activeObject.object" />
			<EmptySelectionCard v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
	import ActionBar from "./_components/ActionBar.vue";
	import CanvasPanel from "./_components/CanvasPanel.vue";
	import EmptySelectionCard from "./_components/EmptySelectionCard.vue";
	import InspectorCard from "./_components/InspectorCard.vue";

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
