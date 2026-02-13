import { FabricObject } from "fabric";

export default defineNuxtPlugin(() => {
	FabricObject.customProperties = [
		"label",
		"locked",
		"zIndex",
		"excludeFromSnap",
		"excludeFromLayers",
	];
});
