<template>
	<Dialog
		v-model:visible="isLayoutModalOpen"
		header="Open Layout"
		class="w-6xl overflow-hidden"
		:pt="{ content: 'aspect-video' }"
		modal
		dismissableMask>
		<div class="flex">
			<DataView :value="groupedLayouts" layout="grid" :pt="{ content: 'py-1!' }">
				<template #grid="{ items }">
					<div v-for="(group, index) in items" :key="index">
						<div class="mb-2 space-x-2">
							<Icon :name="group.location.flag" />
							<span class="text-lg font-bold">{{ group.location.name }}</span>
						</div>

						<div class="mb-8 grid grid-cols-5 gap-4">
							<Panel
								v-for="(item, index) in group.items"
								:key="index"
								class="cursor-pointer shadow-md hover:bg-neutral-50!"
								@click="open(item.uuid)">
								<template #header>
									<div
										class="flex w-full flex-1 items-center justify-between gap-8">
										<div class="flex w-full items-center gap-2 truncate">
											<span class="truncate text-sm">{{ item.name }}</span>
										</div>

										<Button
											variant="text"
											severity="secondary"
											size="small"
											rounded
											@click.stop="">
											<template #icon>
												<Icon :name="Icons.more" />
											</template>
										</Button>
									</div>
								</template>

								<template #footer>
									<div class="flex items-center justify-between gap-16">
										<div></div>

										<p class="text-muted-color text-xs">
											{{ useTimeAgo(new Date(item.updatedAt)).value }}
										</p>
									</div>
								</template>
							</Panel>
						</div>
					</div>
				</template>
			</DataView>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { PanelPassThroughOptions } from "primevue";

	const { open, isLayoutModalOpen, layouts } = useInjectedCanvas();

	const countryFlag = (countryCode: string) => {
		const iconName = `flag${countryCode}`;
		return Icons?.[iconName] ?? Icons.flagPH;
	};

	const groupedLayouts = computed(() => {
		const map = new Map();

		for (const layout of layouts.value) {
			const locationId = layout.location.id;

			if (!map.has(locationId)) {
				map.set(locationId, {
					location: {
						flag: countryFlag(layout.location.countryCode),
						...layout.location,
					},
					items: [],
				});
			}

			map.get(locationId)!.items.push(layout);
		}

		return Array.from(map.values()).sort((a, b) =>
			a.location.name.localeCompare(b.location.name),
		);
	});
</script>
