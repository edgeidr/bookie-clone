<template>
	<ActionBar />

	<div ref="el" class="flex w-full gap-8" :style="`height: ${remainingHeight}px;`">
		<ComponentsCard />
		<CanvasPanel />

		<div class="flex flex-col gap-8">
			<PropertiesCard />
			<CommandPaletteCard />
		</div>
	</div>
</template>

<script setup lang="ts">
	import ActionBar from "./_components/action-bar.vue";
	import CanvasPanel from "./_components/canvas-panel.vue";
	import CommandPaletteCard from "./_components/command-palette-card.vue";
	import ComponentsCard from "./_components/components-card.vue";
	import PropertiesCard from "./_components/properties-card.vue";

	definePageMeta({
		layout: "admin",
		titleKey: "pages.layoutsNew.title",
	});

	const { height: windowHeight } = useWindowSize();
	const el = ref();
	const { top } = useElementBounding(el);
	const padding = 28;

	const remainingHeight = computed(() => {
		return windowHeight.value - top.value - padding;
	});
</script>
