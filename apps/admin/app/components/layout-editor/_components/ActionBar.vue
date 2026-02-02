<template>
	<Toolbar class="mx-auto mb-8 w-fit py-1!">
		<template #center>
			<template v-for="(item, index) in items" :key="index">
				<Button
					v-if="item.type === ToolbarItemType.ACTION"
					v-tooltip.bottom="{ value: item.label, showDelay: 500, class: 'text-xs' }"
					class="mx-0.5"
					:severity="item.isActive ? 'primary' : 'secondary'"
					:variant="item.isActive ? 'outlined' : 'text'"
					size="small"
					:disabled="item.isDisabled"
					@click="item.action">
					<template #icon="slotProps">
						<Icon :name="item.icon" size="large" v-bind="slotProps" />
					</template>
				</Button>

				<Divider v-else layout="vertical" />
			</template>

			<Popover ref="componentsRef"> <ComponentsMenu @selectTool="selectTool" /> </Popover>
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { ToolbarItemType, type ToolbarItem } from "@repo/shared";
	import ComponentsMenu from "./ComponentsMenu.vue";
	import {
		CanvasComponentName,
		CanvasToolName,
		type CanvasToolOrComponent,
	} from "~~/types/canvas";

	const { t } = useI18n();
	const { copy, cut, paste, canPaste, removeSelection, activeToolName } = useInjectedCanvas();
	const componentsRef = useTemplateRef("componentsRef");
	const items = ref<ToolbarItem[]>([
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.save,
			label: t("common.actions.save"),
		},
		{
			type: ToolbarItemType.DIVIDER,
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.select,
			label: t("common.actions.select"),
			isActive: computed(() => isActive(CanvasToolName.SELECT)),
			action: () => selectTool(CanvasToolName.SELECT),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.penTool,
			label: t("common.actions.penTool"),
			isActive: computed(() => isActive(CanvasToolName.PENTOOL)),
			action: () => selectTool(CanvasToolName.PENTOOL),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.text,
			label: t("common.actions.text"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.components,
			label: t("common.ui.components"),
			isActive: computed(() => isComponentsActive()),
			action: (event) => componentsRef.value?.toggle(event),
		},
		{
			type: ToolbarItemType.DIVIDER,
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.undo,
			label: t("common.actions.undo"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.redo,
			label: t("common.actions.redo"),
		},
		{
			type: ToolbarItemType.DIVIDER,
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.cut,
			label: t("common.actions.cut"),
			action: () => cut(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.copy,
			label: t("common.actions.copy"),
			action: () => copy(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.paste,
			label: t("common.actions.paste"),
			isDisabled: computed(() => !canPaste.value),
			action: () => paste(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.delete,
			label: t("common.actions.delete"),
			action: () => removeSelection(),
		},
	]);

	const selectTool = (tool: CanvasToolOrComponent) => {
		activeToolName.value = tool;
		componentsRef.value?.hide();
	};

	const isActive = (tool: CanvasToolOrComponent) => {
		return activeToolName.value === tool;
	};

	const isComponentsActive = () => {
		return Object.values(CanvasComponentName).includes(
			activeToolName.value as CanvasComponentName,
		);
	};
</script>
