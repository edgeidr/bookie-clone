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
						v-model.number="form.x"
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
						v-model.number="form.y"
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
						v-model.number="form.width"
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
						v-model.number="form.height"
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
						v-model.number="form.angle"
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
				<IftaLabel>
					<InputNumber
						v-model.number="form.borderRadius"
						size="small"
						:useGrouping="false"
						:maxFractionDigits="2"
						:min="0"
						showButtons
						fluid>
					</InputNumber>
					<label class="text-sm">Border Radius</label>
				</IftaLabel>

				<IftaLabel>
					<InputNumber
						v-model.number="form.strokeWidth"
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
						<InputText v-model="form.fillColor" />
						<label class="text-sm">Fill Color</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker v-model="form.fillColor" />
					</InputGroupAddon>
				</InputGroup>

				<InputGroup>
					<IftaLabel>
						<InputText v-model="form.strokeColor" />
						<label class="text-sm">Stroke Color</label>
					</IftaLabel>

					<InputGroupAddon>
						<VColorPicker v-model="form.strokeColor" />
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	</Panel>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { PanelPassThroughOptions } from "primevue";

	const panelPT: PanelPassThroughOptions = {
		root: "border-0!",
		header: "p-0!",
		content: "p-0!",
	};
	const GROUPS = {
		TRANSFORM: "Transform",
		APPEARANCE: "Apperance",
	};
	const form = reactive<{
		x: number | null;
		y: number | null;
		width: number | null;
		height: number | null;
		angle: number | null;
		borderRadius: number | null;
		strokeWidth: number | null;
		fillColor: string | null;
		strokeColor: string | null;
	}>({
		x: null,
		y: null,
		width: null,
		height: null,
		angle: null,
		borderRadius: null,
		strokeWidth: null,
		fillColor: null,
		strokeColor: null,
	});
</script>
