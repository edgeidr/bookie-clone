<template>
	<Card class="h-fit w-80">
		<template #title>{{ t("common.ui.components") }}</template>

		<template #content>
			<div class="space-y-4">
				<div>
					<p class="mb-2 text-sm font-semibold">
						{{ t("common.layoutComponents.seats") }}
					</p>

					<div class="grid grid-cols-4 gap-2">
						<Button
							v-for="i in 4"
							:key="i"
							severity="secondary"
							size="large"
							class="aspect-square" />
					</div>
				</div>

				<div>
					<p class="mb-2 text-sm font-semibold">
						{{ t("common.layoutComponents.tables") }}
					</p>

					<div class="grid grid-cols-4 gap-2">
						<Button
							v-for="i in 3"
							:key="i"
							severity="secondary"
							size="large"
							class="aspect-square" />
					</div>
				</div>

				<div>
					<p class="mb-2 text-sm font-semibold">
						{{ t("common.layoutComponents.walls") }}
					</p>

					<div class="grid grid-cols-4 gap-2">
						<Button
							v-for="i in 5"
							:key="i"
							severity="secondary"
							size="large"
							class="aspect-square" />
					</div>
				</div>

				<div>
					<p class="mb-2 text-sm font-semibold">
						{{ t("common.layoutComponents.misc") }}
					</p>

					<div class="grid grid-cols-4 gap-2">
						<Button
							v-for="i in 9"
							:key="i"
							severity="secondary"
							size="large"
							class="aspect-square" />
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
	const { t } = useI18n();
</script>
