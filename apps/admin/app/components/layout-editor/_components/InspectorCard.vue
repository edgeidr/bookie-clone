<template>
	<Card class="w-96" :pt="{ body: 'p-1!' }">
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
	import PropertiesTab from "./PropertiesTab.vue";
	import AttributesTab from "./AttributesTab.vue";

	const { t } = useI18n();
	const TABS = {
		PROPERTIES: t("common.ui.properties"),
		ATTRIBUTES: t("common.ui.attributes"),
	};
	const activeTab = ref(TABS.PROPERTIES);
</script>
