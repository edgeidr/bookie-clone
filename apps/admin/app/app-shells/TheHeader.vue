<template>
	<header class="mb-8 flex justify-between gap-8">
		<div class="flex items-center gap-8">
			<Button
				class="p-0"
				severity="secondary"
				rounded
				@click="isSidebarCollapsed = !isSidebarCollapsed">
				<template #icon="slotProps">
					<Icon :name="Icons.menu" size="1.5em" v-bind="slotProps" />
				</template>
			</Button>

			<span class="font-semibold">{{ route.meta.title }}</span>
		</div>

		<div>
			<ul class="flex items-center gap-4">
				<li>
					<div class="flex">
						<Button
							class="p-0!"
							@click="profileMenu?.toggle"
							severity="secondary"
							rounded>
							<template #icon="slotProps">
								<Icon :name="Icons.user" v-bind="slotProps" />
							</template>
						</Button>

						<Menu ref="profileMenu" :model="profileMenuItems" popup>
							<template #start>
								<div class="px-4 py-2">
									<p>{{ fullName }}</p>
									<p class="text-muted-color text-sm">
										{{ user?.email }}
									</p>
								</div>
							</template>

							<template #item="{ item, label, props }">
								<component
									:is="item.route ? NuxtLink : 'div'"
									:to="item.route"
									v-bind="props.action">
									<Icon v-if="item.icon" v-bind="props.icon" :name="item.icon" />
									<span v-bind="props.label">{{ label }}</span>
								</component>
							</template>
						</Menu>
					</div>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { NuxtLink } from "#components";

	const { t } = useI18n();
	const profileMenu = ref();
	const { user, fullName } = useCurrentUser();
	const isSidebarCollapsed = useState("isSidebarCollapsed");
	const route = useRoute();
	const profileMenuItems = ref([
		{
			separator: true,
		},
		{
			label: t("common.actions.logout"),
			icon: Icons.logout,
		},
	]);
</script>
