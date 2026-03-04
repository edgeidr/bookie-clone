<template>
	<Card
		:pt="{
			root: 'absolute right-0 w-96 right-5 top-5 border border-surface-400',
			body: 'p-1!',
		}">
		<template #content>
			<Tabs v-model:value="activeTab">
				<TabList>
					<Tab v-for="(item, index) in tabs" :key="index" :value="item">{{ item }}</Tab>
				</TabList>

				<TabPanels>
					<TabPanel :value="tabs.CANVAS"> <CanvasPropertiesTab /> </TabPanel>
					<TabPanel :value="tabs.LAYOUT"> <LayoutPropertiesTab /> </TabPanel>
				</TabPanels>
			</Tabs>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import LayoutPropertiesTab from "./LayoutPropertiesTab.vue";
	import CanvasPropertiesTab from "./CanvasPropertiesTab.vue";

	const { activeTab, tabs } = useInjectedCanvas();
</script>
