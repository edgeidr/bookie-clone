import { LayoutStatus } from "@repo/shared";
import { Point, type Canvas } from "fabric";

export const useCanvasData = (canvas: Ref<Canvas | null>, updateLayers: () => void) => {
	const isLayoutModalOpen = ref(false);
	const layouts = ref([]);
	const { fetchAll } = useLayouts();

	const layoutForm = reactive<{
		uuid: string;
		name: string;
		description: string;
		locationId: number | null;
		status: string;
	}>({
		uuid: "",
		name: "",
		description: "",
		locationId: null,
		status: LayoutStatus.INACTIVE,
	});

	const { execute: saveCanvas, pending: isSaving } = useCustomFetch("/layouts", {
		method: "POST",
		body: computed(() => ({
			...layoutForm,
			data: canvas.value?.toJSON(),
		})),
		onResponse: ({ response }) => {
			if (!response.ok) return;

			const responseData = response._data as any;
			layoutForm.uuid = responseData.uuid;
		},
	});

	const { execute: fetchAllLayouts, pending: isFetchingLayouts } = useCustomFetch("/layouts", {
		method: "GET",
		onResponse: ({ response }) => {
			if (!response.ok) return;

			const responseData = response._data as any;
			layouts.value = responseData;
		},
	});

	const { execute: loadCanvas, pending: isLoadingLayout } = useCustomFetch("", {
		method: "GET",
		onResponse: async ({ response }) => {
			const canvasValue = canvas.value;

			if (!response.ok) return;
			if (!canvasValue) return;

			const responseData = response._data as any;

			layoutForm.uuid = responseData.uuid;
			layoutForm.name = responseData.name;
			layoutForm.description = responseData.description;
			layoutForm.locationId = responseData.locationId;
			layoutForm.status = responseData.status;

			await canvasValue.loadFromJSON(responseData.canvas);
			updateLayers();

			canvasValue.setZoom(0.5);
			canvasValue.absolutePan(new Point(0, 0));
			canvasValue.requestRenderAll();
			canvasValue.renderAll();
		},
	});

	const save = () => {
		saveCanvas();
	};

	const open = (layoutId: string) => {
		setIsLayoutModalOpen(false);
		loadCanvas(`/layouts/${layoutId}`);
	};

	const setIsLayoutModalOpen = (isOpen = false) => {
		isLayoutModalOpen.value = isOpen;
	};

	watch(
		() => isLayoutModalOpen.value,
		async (isOpen) => {
			if (!isOpen) return;
			await fetchAll();
		},
	);

	return {
		save,
		open,
		isSaving,
		layoutForm,
		setIsLayoutModalOpen,
		isLayoutModalOpen,
		fetchAllLayouts,
		isFetchingLayouts,
		isLoadingLayout,
		layouts,
	};
};
