<template>
	<p class="text-center text-xs">{{ item?.label }}</p>

	<div v-if="item?.shortcut" class="mt-2 flex items-center justify-center gap-1">
		<Button
			v-if="item.shortcut?.mod"
			class="px-1.5! py-0.5! text-xs!"
			size="small"
			severity="contrast">
			<template v-if="!isMac" #default> ctrl </template>

			<template v-else #icon>
				<Icon :name="Icons.command" />
			</template>
		</Button>

		<Button
			v-if="item.shortcut?.alt"
			class="px-1.5! py-0.5! text-xs!"
			size="small"
			severity="contrast">
			<template #default> alt </template>
		</Button>

		<Button
			:label="item.shortcut?.key"
			class="px-1.5! py-0.5! text-xs!"
			size="small"
			severity="contrast" />
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { ToolbarActionItem } from "@repo/shared";

	const props = defineProps<{ item: ToolbarActionItem | null }>();
	const isMac = navigator.platform.toUpperCase().includes("MAC");
</script>
