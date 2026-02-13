<template>
	<Toolbar class="border-surface-400! absolute inset-x-0 top-5 mx-auto w-fit py-1!">
		<template #center>
			<template v-for="(item, index) in items" :key="index">
				<Button
					v-if="item.type === ToolbarItemType.ACTION"
					class="mx-0.5"
					:severity="item.isActive ? 'primary' : 'secondary'"
					:variant="item.isActive ? 'outlined' : 'text'"
					size="small"
					:disabled="item.isDisabled"
					@mouseenter="(event) => showTooltip(item, event)"
					@mouseleave="hideTooltip"
					@click="item.action">
					<template #icon="slotProps">
						<Icon :name="item.icon" size="large" v-bind="slotProps" />
					</template>
				</Button>

				<Divider v-else layout="vertical" />
			</template>

			<Popover ref="componentsRef" @show="hideTooltip">
				<ComponentsMenu @selectTool="selectTool" />
			</Popover>

			<Popover
				:class="{ invisible: !showDebounced }"
				id="tooltipRef"
				ref="tooltipRef"
				:pt="tooltipPT">
				<ToolbarItemTooltip :item="tooltipItem" />
			</Popover>
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { ToolbarItemType, type ToolbarActionItem, type ToolbarItem } from "@repo/shared";
	import ComponentsMenu from "./ComponentsMenu.vue";
	import {
		CanvasComponentName,
		CanvasToolName,
		type CanvasToolOrComponent,
	} from "~~/types/canvas";
	import type { PopoverPassThroughOptions } from "primevue";

	const tooltipPT: PopoverPassThroughOptions = {
		root: "bg-surface-600!",
		content: "text-surface-0",
	};
	const { t } = useI18n();
	const {
		copy,
		cut,
		paste,
		canPaste,
		removeSelection,
		undoCanvas,
		redoCanvas,
		canUndo,
		canRedo,
		activeToolName,
		selectTool,
	} = useInjectedCanvas();
	const tooltipRef = useTemplateRef("tooltipRef");
	const componentsRef = useTemplateRef("componentsRef");
	const tooltipItem = ref<ToolbarActionItem | null>(null);
	const show = ref(false);
	const showDebounced = refDebounced(show, 500);
	const items = ref<ToolbarItem[]>([
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.save,
			label: t("common.actions.save"),
			shortcut: { mod: true, key: "s" },
		},
		{
			type: ToolbarItemType.DIVIDER,
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.select,
			label: t("common.actions.select"),
			isActive: computed(() => isActive(CanvasToolName.SELECT)),
			shortcut: { alt: true, key: "s" },
			action: () => selectTool(CanvasToolName.SELECT),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.penTool,
			label: t("common.actions.penTool"),
			isActive: computed(() => isActive(CanvasToolName.PENTOOL)),
			shortcut: { alt: true, key: "p" },
			action: () => selectTool(CanvasToolName.PENTOOL),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.text,
			label: t("common.actions.text"),
			shortcut: { alt: true, key: "t" },
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
			isDisabled: computed(() => !canUndo.value),
			shortcut: { mod: true, key: "z" },
			action: () => undoCanvas(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.redo,
			label: t("common.actions.redo"),
			isDisabled: computed(() => !canRedo.value),
			shortcut: { mod: true, key: "y" },
			action: () => redoCanvas(),
		},
		{
			type: ToolbarItemType.DIVIDER,
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.cut,
			label: t("common.actions.cut"),
			shortcut: { mod: true, key: "x" },
			action: () => cut(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.copy,
			label: t("common.actions.copy"),
			shortcut: { mod: true, key: "c" },
			action: () => copy(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.paste,
			label: t("common.actions.paste"),
			isDisabled: computed(() => !canPaste.value),
			shortcut: { mod: true, key: "v" },
			action: () => paste(),
		},
		{
			type: ToolbarItemType.ACTION,
			icon: Icons.delete,
			label: t("common.actions.delete"),
			shortcut: { key: "del" },
			action: () => removeSelection(),
		},
	]);

	const isActive = (tool: CanvasToolOrComponent) => {
		return activeToolName.value === tool;
	};

	const isComponentsActive = () => {
		return Object.values(CanvasComponentName).includes(
			activeToolName.value as CanvasComponentName,
		);
	};

	const showTooltip = (item: ToolbarActionItem, event: MouseEvent) => {
		show.value = true;
		tooltipItem.value = item;
		componentsRef.value?.hide();
		tooltipRef.value?.show(event);
	};

	const hideTooltip = () => {
		show.value = false;
		tooltipItem.value = null;
		tooltipRef.value?.hide();
	};

	watch(
		() => activeToolName.value,
		() => {
			tooltipRef.value?.hide();
			componentsRef.value?.hide();
		},
	);
</script>

<style>
	#tooltipRef.p-popover:after {
		border-bottom-color: var(--p-surface-600);
	}
</style>
