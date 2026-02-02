<template>
	<Card>
		<template #content>
			<div class="text-center">
				<Icon :name="Icons.noSelection" size="2em" class="text-muted-color" />
				<h4>{{ t("common.ui.emptyState.noSelection.title") }}</h4>

				<p class="mt-2 text-sm">{{ t("common.ui.emptyState.noSelection.description") }}</p>
				<p class="mt-2 text-xs">{{ t("common.ui.emptyState.noSelection.tip") }}</p>
			</div>

			<Panel class="mt-8">
				<template #header="slotProps">
					<div class="flex items-center gap-2" :class="slotProps.class">
						<Icon :name="Icons.command" />
						<span>{{ t("common.ui.commandPalette") }}</span>
					</div>
				</template>

				<template #default>
					<ul class="space-y-1 text-sm">
						<li v-for="(item, index) in commandList" :key="index">
							<div class="flex items-center gap-1">
								<Button
									v-if="!item.noCommandKey"
									size="small"
									severity="contrast"
									variant="outlined">
									<template #icon="slotProps">
										<Icon :name="Icons.command" v-bind="slotProps" />
									</template>
								</Button>

								<Button
									size="small"
									severity="contrast"
									variant="outlined"
									class="">
									<template #default="slotProps">
										<kbd v-bind="slotProps">{{ item.shortcut }}</kbd>
									</template>
								</Button>

								<span class="mx-2">-</span>
								<span class="text-muted-color">{{ item.label }}</span>
							</div>
						</li>
					</ul>
				</template>
			</Panel>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { CommandItem } from "@repo/shared";

	const { t } = useI18n();
	const commandList = ref<CommandItem[]>([
		{
			shortcut: "S",
			label: t("common.actions.save"),
		},
		{
			shortcut: "Z",
			label: t("common.actions.undo"),
		},
		{
			shortcut: "Y",
			label: t("common.actions.redo"),
		},
		{
			shortcut: "X",
			label: t("common.actions.cut"),
		},
		{
			shortcut: "C",
			label: t("common.actions.copy"),
		},
		{
			shortcut: "V",
			label: t("common.actions.paste"),
		},
		{
			shortcut: "Del",
			label: t("common.actions.delete"),
			noCommandKey: true,
		},
	]);
</script>
