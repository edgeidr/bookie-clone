<template>
	<Card :pt="{ body: 'p-1!' }">
		<template #content>
			<Tabs v-model:value="activeTab">
				<TabList>
					<Tab v-for="(item, index) in TABS" :key="index" :value="item">{{ item }}</Tab>
				</TabList>

				<TabPanels>
					<TabPanel :value="TABS.PROPERTIES"> <PropertiesTab /> </TabPanel>
					<TabPanel :value="TABS.ATTRIBUTES"> <AttributesTab /> </TabPanel>
				</TabPanels>
			</Tabs>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import PropertiesTab from "./properties-tab.vue";
	import AttributesTab from "./attributes-tab.vue";

	const TABS = {
		PROPERTIES: "Properties",
		ATTRIBUTES: "Attributes",
	};
	const activeTab = ref(TABS.PROPERTIES);
</script>
