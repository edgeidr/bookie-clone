<template>
	<Panel
		:pt="{ root: 'absolute left-5 top-5 border-surface-400! border w-82' }"
		:header="t('common.ui.layers')"
		toggleable>
		<Tree
			v-model:value="nodes"
			v-model:selectionKeys="selectedLayer"
			selectionMode="multiple"
			:metaKeySelection="true"
			@update:selectionKeys="selectObjectsFromLayers"
			@node-drop="updateLayersOrder"
			scrollHeight="20rem"
			draggableNodes
			droppableNodes
			:pt="{ root: 'p-0!' }">
			<template #nodeicon="{ node }">
				<Icon :name="node.icon!" />
			</template>
		</Tree>
	</Panel>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const {
		layers: nodes,
		selectedLayer,
		selectObjectsFromLayers,
		updateLayersOrder,
	} = useInjectedCanvas();
</script>
