<template>
	<div class="space-y-4">
		<div class="grid grid-cols-4 gap-0">
			<Button
				v-for="(item, index) in shapes"
				:key="index"
				severity="secondary"
				:variant="isActive(item.tool) ? undefined : 'text'"
				size="large"
				class="aspect-square"
				@click="selectTool(item.tool)"
				v-tooltip.bottom="{ value: item.label, showDelay: '500', class: 'text-xs' }">
				<template #icon="slotProps">
					<div>
						<Icon
							:name="item.icon"
							mode="svg"
							class="size-8 *:stroke-1"
							:class="item.iconClass"
							v-bind="slotProps" />
					</div>
				</template>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { CanvasToolName } from "~~/types/canvas";

	const emit = defineEmits(["selectTool"]);
	const activeToolName = useState<CanvasToolName>("activeToolName");
	const shapes = [
		{
			label: "Line",
			icon: Icons.line,
			iconClass: "rotate-45",
			tool: CanvasToolName.LINE,
		},
		{
			label: "Rectangle",
			icon: Icons.rectangle,
			tool: CanvasToolName.RECT,
		},
		{
			label: "Ellipse",
			icon: Icons.circle,
			tool: CanvasToolName.ELLIPSE,
		},
	];

	const isActive = (tool: CanvasToolName) => tool === activeToolName.value;

	const selectTool = (tool: CanvasToolName) => {
		activeToolName.value = tool;
		emit("selectTool", tool);
	};
</script>
