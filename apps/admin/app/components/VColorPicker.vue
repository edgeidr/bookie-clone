<template>
	<div
		@click="pickerOverlay?.toggle"
		class="outline-primary aspect-square w-6 cursor-pointer rounded-md border p-0 outline-offset-2"
		:class="{ outline: isOpen }"
		:style="`background-color: ${model}`"
		rounded />

	<Popover ref="pickerOverlay" @show="isOpen = true" @hide="isOpen = false">
		<Vue3ColorPicker
			v-model="model"
			:showEyeDrop="false"
			:showButtons="false"
			:showInputMenu="false"
			:showColorList="false"
			:showPickerMode="false"
			:showInputSet="false"
			mode="solid" />
	</Popover>
</template>

<script setup lang="ts">
	import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
	import "@cyhnkckali/vue3-color-picker/dist/style.css";

	const pickerOverlay = ref();
	const isOpen = ref(false);
	const model = defineModel<string | null>({ default: null });
</script>

<style>
	.ck-cp-container {
		box-shadow: none;
		padding: 0;
	}

	.cp-picker-wrap {
		margin: 0;
	}

	.cp-picker-wrap + div {
		padding: 0 !important;
	}
</style>
