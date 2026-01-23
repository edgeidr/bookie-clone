<template>
	<div class="min-w-72 space-y-4">
		<div class="grid grid-cols-4 gap-2.5">
			<Button
				v-for="i in 8"
				:key="i"
				severity="secondary"
				size="large"
				class="aspect-square" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const { t } = useI18n();
</script>
