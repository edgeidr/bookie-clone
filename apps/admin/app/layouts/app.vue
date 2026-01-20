<template>
	<div>
		<TheSidebar class="duration-200!" :class="[isSidebarCollapsed ? 'w-0' : 'w-80']" />

		<div
			class="min-h-screen flex-1 p-8 duration-200!"
			:class="[isSidebarCollapsed ? 'ml-0' : 'ml-80']">
			<TheHeader />
			<TheMain>
				<slot />
			</TheMain>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import TheHeader from "@/app-shells/TheHeader.vue";
	import TheMain from "@/app-shells/TheMain.vue";
	import TheSidebar from "@/app-shells/TheSidebar.vue";

	const isSidebarCollapsed = useState("isSidebarCollapsed", () => false);
</script>
