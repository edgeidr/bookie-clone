<template>
	<Panel :header="GROUPS.TRANSFORM" toggleable :pt="panelPT">
		<template #toggleicon="{ collapsed }">
			<Icon v-if="collapsed" :name="Icons.add" />
			<Icon v-else :name="Icons.remove" />
		</template>

		<div class="grid grid-cols-2 gap-4">
			<div v-if="visibleProperties.includes(CanvasObjectProperty.left)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.left"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.positionX") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.top)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.top"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.positionY") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.width)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.width"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="1"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.width") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.height)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.height"
						@update:modelValue="applyActiveObjectChanges"
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

			<div v-if="visibleProperties.includes(CanvasObjectProperty.angle)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.angle"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.angle") }}</label>
				</IftaLabel>
			</div>
		</div>
	</Panel>

	<Panel :header="GROUPS.APPEARANCE" toggleable :pt="panelPT" class="pt-2">
		<template #toggleicon="{ collapsed }">
			<Icon v-if="collapsed" :name="Icons.add" />
			<Icon v-else :name="Icons.remove" />
		</template>

		<div class="grid grid-cols-2 gap-4">
			<div v-if="visibleProperties.includes(CanvasObjectProperty.rx)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.rx"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="1"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.radiusX") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.ry)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.ry"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="1"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.radiusY") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.strokeColor)">
				<InputGroup>
					<IftaLabel>
						<InputText
							v-model="activeObject.strokeColor"
							@update:modelValue="applyActiveObjectChanges" />
						<label class="text-sm">{{ t("common.form.strokeColor") }}</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker
							v-model="activeObject.strokeColor"
							@update:modelValue="applyActiveObjectChanges" />
					</InputGroupAddon>
				</InputGroup>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.strokeWidth)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.strokeWidth"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:min="1"
						:useGrouping="false"
						showButtons
						fluid />
					<label class="text-sm">{{ t("common.form.strokeWidth") }}</label>
				</IftaLabel>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.fillColor)">
				<InputGroup>
					<IftaLabel>
						<InputText
							v-model="activeObject.fillColor"
							@update:modelValue="applyActiveObjectChanges" />
						<label class="text-sm">{{ t("common.form.fillColor") }}</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker
							v-model="activeObject.fillColor"
							@update:modelValue="applyActiveObjectChanges" />
					</InputGroupAddon>
				</InputGroup>
			</div>

			<div v-if="visibleProperties.includes(CanvasObjectProperty.borderRadius)">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.rx"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="0"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">{{ t("common.form.borderRadius") }}</label>
				</IftaLabel>
			</div>
		</div>
	</Panel>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { PanelPassThroughOptions } from "primevue";
	import { CanvasObjectProperty, type FabricObjectExtended } from "~~/types/canvas";

	const { t } = useI18n();
	const { activeObject, applyActiveObjectChanges } = useInjectedCanvas();
	const panelPT: PanelPassThroughOptions = {
		root: "border-0!",
		header: "p-0!",
		content: "p-0!",
	};
	const GROUPS = {
		TRANSFORM: t("common.ui.transform"),
		APPEARANCE: t("common.ui.appearance"),
	};

	const visibleProperties = computed(() => {
		if (!activeObject.object) return [];

		const objectType = activeObject.object.type;
		const properties = [
			CanvasObjectProperty.left,
			CanvasObjectProperty.top,
			CanvasObjectProperty.angle,
			CanvasObjectProperty.strokeColor,
			CanvasObjectProperty.strokeWidth,
		];

		switch (objectType) {
			case "rect":
				properties.push(
					CanvasObjectProperty.width,
					CanvasObjectProperty.height,
					CanvasObjectProperty.fillColor,
					CanvasObjectProperty.borderRadius,
				);
				break;

			case "ellipse":
				properties.push(
					CanvasObjectProperty.fillColor,
					CanvasObjectProperty.rx,
					CanvasObjectProperty.ry,
				);
				break;

			case "polygon":
				properties.push(CanvasObjectProperty.fillColor);
				break;

			case "group": {
				if (!(activeObject.object as FabricObjectExtended).isComponent) return [];
				properties.push(CanvasObjectProperty.fillColor);
				break;
			}
		}

		return properties;
	});
</script>
