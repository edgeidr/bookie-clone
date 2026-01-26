<template>
	<Toolbar class="mx-auto mb-8 w-fit py-1!">
		<template #center>
			<template v-for="(item, index) in items" :key="index">
				<Button
					v-if="item.type === ToolbarItemType.ACTION"
					v-tooltip.bottom="{ value: item.label, showDelay: 500, class: 'text-xs' }"
					class="mx-0.5"
					severity="secondary"
					variant="text"
					size="small"
					@click="item.action">
					<template #icon="slotProps">
						<Icon :name="item.icon" size="large" v-bind="slotProps" />
					</template>
				</Button>

				<Divider v-else layout="vertical" />
			</template>

			<Popover ref="shapesRef"> <ShapesMenu @selectTool="selectTool" /> </Popover>
			<Popover ref="componentsRef"> <ComponentsMenu /> </Popover>
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { ToolbarItemType, type ToolbarItem } from "@repo/shared";
	import ShapesMenu from "./shapes-menu.vue";
	import ComponentsMenu from "./components-menu.vue";
	import { CanvasToolName } from "~~/types/canvas";

	const { t } = useI18n();
	const activeToolName = useState("activeToolName");
	const componentsRef = useTemplateRef("componentsRef");
	const shapesRef = useTemplateRef("shapesRef");
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
			action: () => selectTool(CanvasToolName.SELECT),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.penTool,
			label: t("common.actions.penTool"),
			action: () => selectTool(CanvasToolName.PENTOOL),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.text,
			label: t("common.actions.text"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.shapes,
			label: t("common.actions.shapes"),
			action: (event) => shapesRef.value?.toggle(event),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.components,
			label: t("common.ui.components"),
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
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.copy,
			label: t("common.actions.copy"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.paste,
			label: t("common.actions.paste"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.delete,
			label: t("common.actions.delete"),
		},
	]);

	const selectTool = (tool: CanvasToolName) => {
		activeToolName.value = tool;
		shapesRef.value?.hide();
		componentsRef.value?.hide();
	};
</script>
