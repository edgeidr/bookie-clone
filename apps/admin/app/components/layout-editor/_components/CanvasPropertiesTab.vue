<template>
	<Panel :header="GROUPS.TRANSFORM" :pt="panelPT">
		<div class="grid grid-cols-2 gap-4">
			<IftaLabel>
				<InputNumber
					v-model="canvasProperties.width"
					size="small"
					:useGrouping="false"
					:maxFractionDigits="2"
					:min="1"
					showButtons
					fluid>
				</InputNumber>
				<label class="text-sm">{{ t("common.form.width") }}</label>
			</IftaLabel>

			<IftaLabel>
				<InputNumber
					v-model="canvasProperties.height"
					size="small"
					:useGrouping="false"
					:maxFractionDigits="2"
					:min="1"
					showButtons
					fluid>
				</InputNumber>
				<label class="text-sm">{{ t("common.form.height") }}</label>
			</IftaLabel>
		</div>
	</Panel>

	<Panel :header="GROUPS.APPEARANCE" :pt="panelPT" class="pt-2">
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
