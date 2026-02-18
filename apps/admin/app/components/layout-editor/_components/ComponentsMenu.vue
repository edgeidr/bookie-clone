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
					class="aspect-square p-0!"
					:class="{ 'border-surface-300!': isActive(item.tool) }"
					@click="selectTool(item.tool)"
					v-tooltip.bottom="{ value: item.label, showDelay: '500', class: 'text-xs' }">
					<template #icon="slotProps">
						<div>
							<img v-if="item.image" :src="item.image" class="size-8" />

							<Icon
								v-if="item.icon"
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
	import { Icons, Svg } from "@repo/assets";
	import { CanvasComponentName, type CanvasToolOrComponent } from "~~/types/canvas";

	const emit = defineEmits(["selectTool"]);
	const { t } = useI18n();
	const activeToolName = useState<CanvasToolOrComponent>("activeToolName");
	const components = ref<
		{
			label: string;
			items: {
				label: string;
				icon?: string;
				image?: string;
				tool: CanvasComponentName;
			}[];
		}[]
	>([
		{
			label: t("common.layoutComponents.seats.title"),
			items: [
				{
					label: t("common.layoutComponents.seats.items.chair"),
					image: Svg.Chair,
					tool: CanvasComponentName.Chair,
				},
				{
					label: t("common.layoutComponents.seats.items.armChairA"),
					image: Svg.ArmChairA,
					tool: CanvasComponentName.ArmChairA,
				},
				{
					label: t("common.layoutComponents.seats.items.armChairB"),
					image: Svg.ArmChairB,
					tool: CanvasComponentName.ArmChairB,
				},
				{
					label: t("common.layoutComponents.seats.items.armChairC"),
					image: Svg.ArmChairC,
					tool: CanvasComponentName.ArmChairC,
				},
			],
		},
		{
			label: t("common.layoutComponents.doors.title"),
			items: [
				{
					label: t("common.layoutComponents.doors.items.singleDoor"),
					image: Svg.SingleDoor,
					tool: CanvasComponentName.SingleDoor,
				},
				{
					label: t("common.layoutComponents.doors.items.doubleDoor"),
					image: Svg.DoubleDoor,
					tool: CanvasComponentName.DoubleDoor,
				},
				{
					label: t("common.layoutComponents.doors.items.slidingDoor"),
					image: Svg.SlidingDoor,
					tool: CanvasComponentName.SlidingDoor,
				},
			],
		},
		{
			label: t("common.layoutComponents.misc.title"),
			items: [
				{
					label: t("common.layoutComponents.misc.items.directionArrow"),
					image: Svg.DirectionArrow,
					tool: CanvasComponentName.DirectionArrow,
				},
				{
					label: t("common.layoutComponents.misc.items.exitSign"),
					image: Svg.ExitSign,
					tool: CanvasComponentName.ExitSign,
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
