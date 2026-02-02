<template>
	<div class="space-y-4">
		<div v-for="group in components" :key="group.label">
			<p class="mb-2 text-sm">{{ group.label }}</p>

			<div class="grid grid-cols-4 gap-0">
				<Button
					v-for="(item, index) in group.items"
					:key="index"
					severity="secondary"
					:variant="isActive(item.tool) ? undefined : 'text'"
					size="large"
					class="aspect-square"
					:class="{ 'border-surface-300!': isActive(item.tool) }"
					@click="selectTool(item.tool)"
					v-tooltip.bottom="{ value: item.label, showDelay: '500', class: 'text-xs' }">
					<template #icon="slotProps">
						<div>
							<Icon
								:name="item.icon"
								mode="svg"
								class="size-8 *:stroke-1"
								v-bind="slotProps" />
						</div>
					</template>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { isatty } from "node:tty";
	import { CanvasComponentName, type CanvasToolOrComponent } from "~~/types/canvas";

	const emit = defineEmits(["selectTool"]);
	const { t } = useI18n();
	const activeToolName = useState<CanvasToolOrComponent>("activeToolName");
	const components = ref<
		{
			label: string;
			items: {
				label: string;
				icon: string;
				tool: CanvasComponentName;
			}[];
		}[]
	>([
		{
			label: t("common.layoutComponents.seats.title"),
			items: [
				{
					label: t("common.layoutComponents.seats.items.seatA"),
					icon: Icons.seat,
					tool: CanvasComponentName.SEAT_A,
				},
				{
					label: t("common.layoutComponents.seats.items.seatB"),
					icon: Icons.seat,
					tool: CanvasComponentName.SEAT_B,
				},
				{
					label: t("common.layoutComponents.seats.items.seatC"),
					icon: Icons.seat,
					tool: CanvasComponentName.SEAT_C,
				},
				{
					label: t("common.layoutComponents.seats.items.seatD"),
					icon: Icons.seat,
					tool: CanvasComponentName.SEAT_D,
				},
			],
		},
		{
			label: t("common.layoutComponents.tables.title"),
			items: [
				{
					label: t("common.layoutComponents.tables.items.tableA"),
					icon: Icons.table,
					tool: CanvasComponentName.TABLE_A,
				},
				{
					label: t("common.layoutComponents.tables.items.tableB"),
					icon: Icons.table,
					tool: CanvasComponentName.TABLE_B,
				},
				{
					label: t("common.layoutComponents.tables.items.tableC"),
					icon: Icons.table,
					tool: CanvasComponentName.TABLE_C,
				},
			],
		},
		{
			label: t("common.layoutComponents.misc.title"),
			items: [
				{
					label: t("common.layoutComponents.misc.items.miscA"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_A,
				},
				{
					label: t("common.layoutComponents.misc.items.miscB"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_B,
				},
				{
					label: t("common.layoutComponents.misc.items.miscC"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_C,
				},
				{
					label: t("common.layoutComponents.misc.items.miscD"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_D,
				},
				{
					label: t("common.layoutComponents.misc.items.miscE"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_E,
				},
				{
					label: t("common.layoutComponents.misc.items.miscF"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_F,
				},
				{
					label: t("common.layoutComponents.misc.items.miscG"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_G,
				},
				{
					label: t("common.layoutComponents.misc.items.miscH"),
					icon: Icons.misc,
					tool: CanvasComponentName.MISC_H,
				},
			],
		},
		{
			label: t("common.layoutComponents.shapes.title"),
			items: [
				{
					label: t("common.layoutComponents.shapes.items.rectangle"),
					icon: Icons.rectangle,
					tool: CanvasComponentName.RECT,
				},
				{
					label: t("common.layoutComponents.shapes.items.ellipse"),
					icon: Icons.circle,
					tool: CanvasComponentName.ELLIPSE,
				},
			],
		},
	]);

	const isActive = (tool: CanvasToolOrComponent) => tool === activeToolName.value;

	const selectTool = (tool: CanvasToolOrComponent) => {
		emit("selectTool", tool);
	};
</script>
