<template>
	<Panel :header="GROUPS.APPEARANCE" :pt="panelPT">
		<div class="grid grid-cols-2 gap-4">
			<InputGroup>
				<IftaLabel>
					<InputText v-model="canvasProperties.backgroundColor" />
					<label class="text-sm">{{ t("common.form.backgroundColor") }}</label>
				</IftaLabel>

				<InputGroupAddon>
					<VColorPicker v-model="canvasProperties.backgroundColor" />
				</InputGroupAddon>
			</InputGroup>
		</div>
	</Panel>
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
