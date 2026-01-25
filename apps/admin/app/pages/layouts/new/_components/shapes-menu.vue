<template>
	<div class="min-w-72 space-y-4">
		<div class="grid grid-cols-4 gap-2.5">
			<Button
				v-for="(item, index) in shapes"
				:key="index"
				severity="secondary"
				variant="text"
				size="large"
				class="aspect-square"
				@click="activeToolName = item.tool">
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
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { CanvasToolName } from "~~/types/canvas";

	const activeToolName = useState<CanvasToolName>("activeToolName");
	const shapes = [
		{
			label: "Rectangle",
			icon: Icons.rectangle,
			tool: CanvasToolName.RECT,
		},
	];
</script>
