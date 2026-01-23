<template>
	<div class="min-w-72 space-y-4">
		<div>
			<p class="mb-2 text-sm">{{ t("common.layoutComponents.seats") }}</p>

			<div class="grid grid-cols-4 gap-2.5">
				<Button
					v-for="i in 4"
					:key="i"
					severity="secondary"
					size="large"
					class="aspect-square" />
			</div>
		</div>

		<div>
			<p class="mb-2 text-sm">{{ t("common.layoutComponents.tables") }}</p>

			<div class="grid grid-cols-4 gap-2.5">
				<Button
					v-for="i in 3"
					:key="i"
					severity="secondary"
					size="large"
					class="aspect-square" />
			</div>
		</div>

		<div>
			<p class="mb-2 text-sm">{{ t("common.layoutComponents.misc") }}</p>

			<div class="grid grid-cols-4 gap-2.5">
				<Button
					v-for="i in 8"
					:key="i"
					severity="secondary"
					size="large"
					class="aspect-square" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const { t } = useI18n();
</script>
