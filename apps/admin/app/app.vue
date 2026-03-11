<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>

	<Toast />
</template>

<script setup lang="ts">
	const { fetchAll: fetchAllLocations } = useLocations();

	await fetchAllLocations();
</script>
