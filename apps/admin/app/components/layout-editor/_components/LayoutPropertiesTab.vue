<template>
	<div class="mt-2 space-y-4">
		<IftaLabel>
			<InputText v-model="form.name" fluid />
			<label>{{ t("common.form.layoutName") }}</label>
		</IftaLabel>

		<IftaLabel class="flex!">
			<Textarea v-model="form.description" autoResize fluid />
			<label>{{ t("common.form.layoutDescription") }}</label>
		</IftaLabel>

		<IftaLabel>
			<Select v-model="form.location" :options="layoutLocations" optionLabel="name" fluid>
				<template #value="slotProps">
					<div v-if="slotProps.value" class="flex items-center">
						<Icon :name="slotProps.value.flag" class="mr-4" />
						<div class="font-medium">{{ slotProps.value.name }}</div>
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
			<Select v-model="form.status" :options="layoutStatuses" fluid />
			<label>{{ t("common.form.layoutStatus") }}</label>
		</IftaLabel>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";

	interface LayoutLocation {
		flag: string;
		name: string;
	}

	enum LayoutStatus {
		ACTIVE = "Active",
		INACTIVE = "Inactive",
	}

	const { t } = useI18n();
	const form = reactive<{
		name: string;
		description?: string;
		location: LayoutLocation["name"] | null;
		status: LayoutStatus;
	}>({
		name: "",
		description: "",
		location: null,
		status: LayoutStatus.ACTIVE,
	});

	const layoutLocations = ref<LayoutLocation[]>([
		{ name: "Manila", flag: Icons.flagPH },
		{ name: "Tacloban", flag: Icons.flagPH },
		{ name: "Mexico", flag: Icons.flagMX },
		{ name: "South Africa", flag: Icons.flagZA },
		{ name: "Canada", flag: Icons.flagCA },
		{ name: "US", flag: Icons.flagUS },
	]);

	const layoutStatuses = ref(Object.values(LayoutStatus));
</script>
