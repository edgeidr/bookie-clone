<template>
	<div class="fixed inset-0 flex size-full">
		<TheSidebar />

		<div class="grow p-8">
			<TheHeader />
			<TheMain />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import TheHeader from "@/app-shells/TheHeader.vue";
	import TheMain from "@/app-shells/TheMain.vue";
	import TheSidebar from "@/app-shells/TheSidebar.vue";
</script>
