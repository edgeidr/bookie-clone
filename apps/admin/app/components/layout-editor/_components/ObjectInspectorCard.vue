<template>
	<Card :pt="{ root: 'w-96 absolute right-5 top-5 border-surface-400! border', body: 'p-1!' }">
		<template #content>
			<Tabs v-model:value="activeTab">
				<TabList>
					<Tab v-for="(item, index) in TABS" :key="index" :value="item">{{ item }}</Tab>
				</TabList>

				<TabPanels>
					<TabPanel :value="TABS.PROPERTIES"> <ObjectPropertiesTab /> </TabPanel>
					<TabPanel :value="TABS.ATTRIBUTES"> <ObjectAttributesTab /> </TabPanel>
				</TabPanels>
			</Tabs>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import ObjectPropertiesTab from "./ObjectPropertiesTab.vue";
	import ObjectAttributesTab from "./ObjectAttributesTab.vue";

	const { t } = useI18n();
	const TABS = {
		PROPERTIES: t("common.ui.properties"),
		ATTRIBUTES: t("common.ui.attributes"),
	};
	const activeTab = ref(TABS.PROPERTIES);
</script>
