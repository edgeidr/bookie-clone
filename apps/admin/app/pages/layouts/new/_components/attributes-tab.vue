<template>
	<div class="flex items-center justify-between gap-8">
		<label for="isBookable">Bookable</label>
		<ToggleSwitch inputId="isBookable" v-model="isBookable" />
	</div>

	<Divider />

	<div class="mt-6 space-y-4">
		<IftaLabel>
			<InputText :disabled="!isBookable" fluid />
			<label>ID</label>
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
			<label>Booking Type</label>
		</IftaLabel>
	</div>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";

	const isBookable = ref(false);
	const bookingTypeOptions = ref([
		{
			label: "Instant Booking",
			value: "instant",
			description: "Bookings are confirmed immediately",
			icon: Icons.instantBooking,
		},
		{
			label: "Requires Approval",
			value: "approvalRequired",
			description: "Bookings must be approved before confirmation",
			icon: Icons.approvalRequired,
		},
	]);
</script>
