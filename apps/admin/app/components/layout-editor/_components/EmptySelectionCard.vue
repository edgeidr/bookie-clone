<template>
	<Card>
		<template #content>
			<div class="text-center">
				<Icon :name="Icons.noSelection" size="2em" class="text-muted-color" />
				<h4>{{ t("common.ui.emptyState.noSelection.title") }}</h4>

				<p class="mt-2 text-sm">{{ t("common.ui.emptyState.noSelection.description") }}</p>
				<p class="mt-2 text-xs">{{ t("common.ui.emptyState.noSelection.tip") }}</p>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import { Icons } from "@repo/assets";

	const { t } = useI18n();
</script>
