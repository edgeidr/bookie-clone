<template>
	<div class="mt-2 space-y-4">
		<IftaLabel>
			<InputText v-model="layoutForm.name" fluid />
			<label>{{ t("common.form.layoutName") }}</label>
		</IftaLabel>

		<IftaLabel class="flex!">
			<Textarea v-model="layoutForm.description" autoResize fluid />
			<label>{{ t("common.form.layoutDescription") }}</label>
		</IftaLabel>

		<IftaLabel>
			<Select
				v-model="layoutForm.locationId"
				:options="layoutLocations"
				optionLabel="name"
				optionValue="id"
				fluid>
				<template #value>
					<div v-if="selectedLocation" class="flex items-center">
						<Icon :name="selectedLocation.flag" class="mr-4" />
						<div class="font-medium">
							{{ selectedLocation.name }}
						</div>
					</div>
				</template>

				<template #option="slotProps">
					<div class="flex items-center">
						<Icon :name="slotProps.option.flag" class="mr-4" />
						<div class="font-medium">{{ slotProps.option.name }}</div>
					</div>
				</template>
			</Select>
			<label>{{ t("common.form.layoutLocation") }}</label>
		</IftaLabel>

		<IftaLabel>
			<Select v-model="layoutForm.status" :options="layoutStatuses" fluid />
			<label>{{ t("common.form.layoutStatus") }}</label>
		</IftaLabel>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";
	import { LayoutStatus } from "@repo/shared";

	interface LayoutLocation {
		id: number;
		flag: string;
		name: string;
	}

	const { t } = useI18n();
	const { layoutForm } = useInjectedCanvas();

	const layoutLocations = ref<LayoutLocation[]>([
		{ id: 1, name: "Manila", flag: Icons.flagPH },
		{ id: 2, name: "Tacloban", flag: Icons.flagPH },
		{ id: 3, name: "Mexico", flag: Icons.flagMX },
		{ id: 4, name: "South Africa", flag: Icons.flagZA },
		{ id: 5, name: "Canada", flag: Icons.flagCA },
		{ id: 6, name: "US", flag: Icons.flagUS },
	]);

	const layoutStatuses = ref(Object.values(LayoutStatus));

	const selectedLocation = computed(() => {
		if (!layoutForm.locationId) return null;
		return layoutLocations.value.find(({ id }) => id === layoutForm.locationId);
	});
</script>
