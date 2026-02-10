<template>
	<div class="flex items-center justify-between gap-8">
		<label for="isSnappingEnabled">{{ t("common.form.enableSnapping") }}</label>
		<ToggleSwitch inputId="isSnappingEnabled" v-model="canvasProperties.isSnappingEnabled" />
	</div>

	<!-- <Divider />

	<Panel :header="GROUPS.APPEARANCE" :pt="panelPT">
		<div class="grid grid-cols-2 gap-4"></div>
	</Panel> -->
</template>

<script setup lang="ts">
	import type { PanelPassThroughOptions } from "primevue";

	const { t } = useI18n();
	const { canvasProperties } = useInjectedCanvas();
	const panelPT: PanelPassThroughOptions = {
		root: "border-0!",
		header: "px-0! py-3!",
		content: "p-0!",
	};
	const GROUPS = {
		TRANSFORM: t("common.ui.transform"),
		APPEARANCE: t("common.ui.appearance"),
	};
</script>
