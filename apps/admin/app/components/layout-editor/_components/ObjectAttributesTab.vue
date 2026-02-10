<template>
	<div class="flex items-center justify-between gap-8">
		<label for="isBookable">{{ t("common.form.bookable") }}</label>
		<ToggleSwitch inputId="isBookable" v-model="isBookable" />
	</div>

	<Divider />

	<div class="mt-6 space-y-4">
		<IftaLabel>
			<InputText :disabled="!isBookable" fluid />
			<label>{{ t("common.form.bookableId") }}</label>
		</IftaLabel>

		<IftaLabel>
			<Select
				:options="bookingTypeOptions"
				optionLabel="label"
				optionValue="value"
				:disabled="!isBookable"
				fluid>
				<template #option="{ option }">
					<Icon :name="option.icon" class="mr-4" />

					<div>
						<div class="font-medium">{{ option.label }}</div>
						<div class="text-muted-color text-xs">{{ option.description }}</div>
					</div>
				</template>
			</Select>
			<label>{{ t("common.form.bookingType") }}</label>
		</IftaLabel>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";

	const { t } = useI18n();
	const isBookable = ref(false);
	const bookingTypeOptions = ref([
		{
			label: t("common.bookingTypes.instant.label"),
			value: "instant",
			description: t("common.bookingTypes.instant.description"),
			icon: Icons.instantBooking,
		},
		{
			label: t("common.bookingTypes.approvalRequired.label"),
			value: "approvalRequired",
			description: t("common.bookingTypes.approvalRequired.description"),
			icon: Icons.approvalRequired,
		},
	]);
</script>
