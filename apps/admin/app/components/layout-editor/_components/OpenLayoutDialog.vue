<template>
	<Dialog
		v-model:visible="isLayoutModalOpen"
		header="Open Layout"
		class="w-6xl overflow-hidden"
		:pt="{ content: 'aspect-video' }"
		modal
		dismissableMask>
		<div class="flex size-full">
			<div class="border-surface flex w-72 flex-col rounded border p-1">
				<span class="text-muted-color px-3 py-2 font-semibold">
					{{ t("common.ui.locations") }}
				</span>

				<a
					v-for="(item, index) in locations"
					:key="index"
					severity="secondary"
					:class="[{ 'bg-surface-100': selectedLocationId === item.id }]"
					class="p-menu-item-link hover:bg-surface-100 my-0.5"
					@click="() => (selectedLocationId = item.id)"
					fluid
					:pt="{ label: 'truncate' }">
					<div class="flex w-full items-center justify-between gap-4">
						<div class="flex items-center gap-2">
							<Icon
								:name="getCountryFlag(item.countryCode)"
								class="size-4 shrink-0" />
							<span class="truncate">{{ item.name }}</span>
						</div>

						<div>
							<Badge
								v-if="getLayoutsCount(item.id)"
								:value="getLayoutsCount(item.id)"
								severity="secondary" />
						</div>
					</div>
				</a>
			</div>

			<div class="ml-4 size-full">
				<DataView :value="filteredLayouts" layout="grid">
					<template #grid="{ items }">
						<div v-for="(group, index) in items" :key="index">
							<div class="mb-8 grid grid-cols-4 gap-4">
								<Panel
									v-for="(item, index) in group.items"
									:key="index"
									class="cursor-pointer shadow-md hover:bg-neutral-50!"
									@click="open(item.uuid)">
									<template #header>
										<div
											class="flex w-full flex-1 items-center justify-between gap-8">
											<div class="flex w-full items-center gap-2 truncate">
												<span class="truncate text-sm">
													{{ item.name }}
												</span>
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
		</div>
	</Dialog>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import type { Layout, Location } from "@repo/shared";
	import { Badge } from "primevue";

	const { t } = useI18n();
	const { open, isLayoutModalOpen } = useInjectedCanvas();
	const { getCountryFlag, locations } = useLocations();
	const { layouts, getLayoutsCount } = useLayouts();
	const selectedLocationId = ref<Location["id"] | null>(null);

	const groupedLayouts = computed(() => {
		if (!layouts.value) return [];

		const map = new Map();

		for (const layout of layouts.value) {
			const locationId = layout.location!.id;

			if (!map.has(locationId)) {
				map.set(locationId, {
					location: {
						flag: getCountryFlag(layout.location!.countryCode),
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

	const filteredLayouts = computed(() => {
		return groupedLayouts.value.filter(
			(layout: Layout) => layout.location!.id == selectedLocationId.value,
		);
	});
</script>
