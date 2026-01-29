<template>
	<div
		ref="el"
		class="flex w-full gap-8 overflow-hidden"
		:style="`height: ${remainingHeight}px;`">
		<div class="flex flex-1 flex-col">
			<ActionBar />
			<CanvasPanel />
		</div>

		<div class="mt-20 flex w-96 flex-col gap-8">
			<InspectorCard v-if="activeObject.object" />
			<CommandPaletteCard v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
	import ActionBar from "./_components/action-bar.vue";
	import CanvasPanel from "./_components/canvas-panel.vue";
	import CommandPaletteCard from "./_components/command-palette-card.vue";
	import InspectorCard from "./_components/inspector-card.vue";

	definePageMeta({
		layout: "admin",
		titleKey: "pages.layoutsNew.title",
	});

	const { height: windowHeight } = useWindowSize();
	const el = ref();
	const { top } = useElementBounding(el);
	const padding = 28;
	const { activeObject } = useCanvas();

	const remainingHeight = computed(() => {
		return windowHeight.value - top.value - padding;
	});
</script>
