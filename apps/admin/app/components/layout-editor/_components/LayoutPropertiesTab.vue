<template>
	<div class="mt-2 space-y-4">
		<div>
			<IftaLabel>
				<InputText v-model="layoutForm.name" :invalid="layoutFormHasErrors('name')" fluid />
				<label>{{ t("common.form.layoutName") }}</label>
			</IftaLabel>
			<FieldErrors field="name" :formErrors="layoutFormErrors" />
		</div>

		<div>
			<IftaLabel class="flex!">
				<Textarea
					v-model="layoutForm.description"
					:invalid="layoutFormHasErrors('description')"
					autoResize
					fluid />
				<label>
					{{ t("common.form.layoutDescription") }}
					<span class="lowercase opacity-70">({{ t("common.form.optional") }})</span>
				</label>
			</IftaLabel>
			<FieldErrors field="description" :formErrors="layoutFormErrors" />
		</div>

		<div>
			<IftaLabel>
				<Select
					v-model="layoutForm.locationId"
					:options="locations!"
					optionLabel="name"
					optionValue="id"
					:invalid="layoutFormHasErrors('locationId')"
					fluid>
					<template #value>
						<div v-if="selectedLocation" class="flex items-center">
							<Icon
								:name="getCountryFlag(selectedLocation.countryCode)"
								class="mr-4" />
							<div class="font-medium">
								{{ selectedLocation.name }}
							</div>
						</div>
					</template>

					<template #option="slotProps">
						<div class="flex items-center">
							<Icon
								:name="getCountryFlag(slotProps.option.countryCode)"
								class="mr-4" />
							<div class="font-medium">{{ slotProps.option.name }}</div>
						</div>
					</template>
				</Select>
				<label>{{ t("common.form.layoutLocation") }}</label>
			</IftaLabel>
			<FieldErrors field="locationId" :formErrors="layoutFormErrors" />
		</div>

		<div>
			<IftaLabel>
				<Select
					v-model="layoutForm.status"
					:options="layoutStatuses"
					:invalid="layoutFormHasErrors('status')"
					class="lowercase first-letter:uppercase!"
					fluid
					:pt="{
						label: 'lowercase first-letter:uppercase',
						optionLabel: 'lowercase first-letter:uppercase',
					}" />
				<label>{{ t("common.form.layoutStatus") }}</label>
			</IftaLabel>
			<FieldErrors field="status" :formErrors="layoutFormErrors" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { LayoutStatus } from "@repo/shared";

	const { t } = useI18n();
	const { layoutForm, layoutFormErrors, layoutFormHasErrors } = useInjectedCanvas();
	const { locations, getCountryFlag } = useLocations();

	const layoutStatuses = ref(Object.values(LayoutStatus));

	const selectedLocation = computed(() => {
		if (!layoutForm.locationId) return null;
		if (!locations.value) return null;

		return locations.value.find(({ id }) => id === layoutForm.locationId);
	});
</script>
