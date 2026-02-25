import { LayoutStatus } from "@repo/shared";
import type { Canvas } from "fabric";

export const useCanvasData = (canvas: Ref<Canvas | null>, updateLayers: () => void) => {
	const layoutForm = reactive<{
		name: string;
		description: string;
		locationId: number | null;
		status: string;
	}>({
		name: "",
		description: "",
		locationId: null,
		status: LayoutStatus.INACTIVE,
	});

	const { execute: saveCanvas, pending: isSaving } = useCustomFetch("/layouts", {
		method: "POST",
		body: computed(() => ({
			...layoutForm,
			data: JSON.stringify(canvas.value?.toJSON()),
		})),
	});

	const { execute: loadCanvas, pending: isLoading } = useCustomFetch("/layouts", {
		method: "GET",
		onResponse: async ({ response }) => {
			if (!response.ok) return;

			const responseData = response._data as any;

			layoutForm.name = responseData.name;
			layoutForm.description = responseData.description;
			layoutForm.locationId = responseData.locationId;
			layoutForm.status = responseData.status;

			await canvas.value!.loadFromJSON(JSON.parse(responseData.canvas));
			updateLayers();
			canvas.value!.renderAll();
		},
	});

	const save = () => {
		saveCanvas();
	};

	const open = () => {
		loadCanvas();
	};

	return { save, open, isSaving, layoutForm };
};
