<template>
	<Toolbar class="mx-auto mb-8 w-fit py-1!">
		<template #center>
			<template v-for="(item, index) in items" :key="index">
				<Button
					v-if="item.type === ToolbarItemType.ACTION"
					v-tooltip.bottom="{ value: item.label, class: 'text-xs' }"
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

			<Popover ref="shapesRef"> <ShapesMenu /> </Popover>
			<Popover ref="componentsRef"> <ComponentsMenu /> </Popover>
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { ToolbarItemType, type ToolbarItem } from "@repo/shared";
	import ShapesMenu from "./shapes-menu.vue";
	import ComponentsMenu from "./components-menu.vue";

	const { t } = useI18n();
	const componentsRef = ref();
	const shapesRef = ref();
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
			icon: Icons.draw,
			label: t("common.actions.draw"),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.brush,
			label: t("common.actions.brush"),
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
</script>
