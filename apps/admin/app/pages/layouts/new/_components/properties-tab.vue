<template>
	<Panel :header="GROUPS.TRANSFORM" toggleable :pt="panelPT">
		<template #toggleicon="{ collapsed }">
			<Icon v-if="collapsed" :name="Icons.add" />
			<Icon v-else :name="Icons.remove" />
		</template>

		<div class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
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
					<label class="text-sm">X</label>
				</IftaLabel>

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
					<label class="text-sm">Y</label>
				</IftaLabel>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<IftaLabel>
					<InputNumber
						v-model="activeObject.width"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="0"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">Width</label>
				</IftaLabel>

				<IftaLabel>
					<InputNumber
						v-model="activeObject.height"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="0"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">Height</label>
				</IftaLabel>
			</div>

			<div class="grid grid-cols-2 gap-4">
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
					<label class="text-sm">Angle</label>
				</IftaLabel>
			</div>
		</div>
	</Panel>

	<Panel :header="GROUPS.APPEARANCE" toggleable :pt="panelPT" class="pt-2">
		<template #toggleicon="{ collapsed }">
			<Icon v-if="collapsed" :name="Icons.add" />
			<Icon v-else :name="Icons.remove" />
		</template>

		<div class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<InputGroup>
					<IftaLabel>
						<InputText
							v-model="activeObject.strokeColor"
							@update:modelValue="applyActiveObjectChanges" />
						<label class="text-sm">Stroke Color</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker
							v-model="activeObject.strokeColor"
							@update:modelValue="applyActiveObjectChanges" />
					</InputGroupAddon>
				</InputGroup>

				<IftaLabel>
					<InputNumber
						v-model="activeObject.strokeWidth"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:min="1"
						:useGrouping="false"
						showButtons
						fluid />
					<label class="text-sm">Stroke Width</label>
				</IftaLabel>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<InputGroup>
					<IftaLabel>
						<InputText
							v-model="activeObject.fillColor"
							@update:modelValue="applyActiveObjectChanges" />
						<label class="text-sm">Fill Color</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker
							v-model="activeObject.fillColor"
							@update:modelValue="applyActiveObjectChanges" />
					</InputGroupAddon>
				</InputGroup>

				<IftaLabel v-if="activeObject.object && 'rx' in activeObject.object">
					<InputNumber
						v-model="activeObject.borderRadius"
						@update:modelValue="applyActiveObjectChanges"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="0"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">Border Radius</label>
				</IftaLabel>
			</div>
		</div>
	</Panel>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { PanelPassThroughOptions } from "primevue";

	const { activeObject, applyActiveObjectChanges } = useCanvas();
	const panelPT: PanelPassThroughOptions = {
		root: "border-0!",
		header: "p-0!",
		content: "p-0!",
	};
	const GROUPS = {
		TRANSFORM: "Transform",
		APPEARANCE: "Apperance",
	};
</script>
