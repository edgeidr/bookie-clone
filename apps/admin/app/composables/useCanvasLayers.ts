import { ActiveSelection, type Canvas } from "fabric";
import type { TreeSelectionKeys } from "primevue";
import type { TreeNode } from "primevue/treenode";
import type { FabricObjectExtended } from "~~/types/canvas";

export const useCanvasLayers = (canvas: Ref<Canvas | null>) => {
	const selectedLayer = ref<TreeSelectionKeys>({});
	const layers = ref<TreeNode[]>([]);

	const updateLayers = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		clearLayers();

		const objects: FabricObjectExtended[] = [...canvasValue.getObjects()].reverse();
		let tempLayers: TreeNode[] = [];

		objects.forEach((object, index) => {
			if (object.excludeFromLayers) return;

			initObject(object, index);

			tempLayers.push({
				key: object.id!,
				label: object.label,
				icon: "hugeicons:square",
			});
		});

		layers.value = tempLayers;
	};

	const clearLayers = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		layers.value = [];
	};

	const initObject = (object: FabricObjectExtended, index: number) => {
		if (object.id) return;

		const id = crypto.randomUUID();

		object.id = id;
		object.zIndex = index;
	};

	const updateSelectedLayer = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject: FabricObjectExtended | ActiveSelection | undefined =
			canvasValue.getActiveObject();
		let selected: TreeSelectionKeys = {};

		if (!activeObject) {
			selected = {};
		} else if (activeObject.isType("activeselection")) {
			(activeObject as ActiveSelection).forEachObject((object: FabricObjectExtended) => {
				if (!object.id) return;
				if (object.excludeFromLayers) return;

				selected[object.id] = true;
			});
		} else if (activeObject.id) {
			selected = { [activeObject.id]: true };
		}

		selectedLayer.value = selected;
	};

	const selectObjectsFromLayers = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const selectedLayerIds = Object.keys(selectedLayer.value);
		const objects = canvasValue
			.getObjects()
			.filter((object: FabricObjectExtended) => selectedLayerIds.includes(object.id!));

		if (!objects.length) return;

		if (objects.length === 1) {
			canvasValue.setActiveObject(objects[0]!);
		} else {
			const selection = new ActiveSelection(objects, { canvas: canvasValue });
			canvasValue.setActiveObject(selection);
		}

		canvasValue.requestRenderAll();
	};

	const updateLayersOrder = async () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const backgroundSnapshot = canvasValue.backgroundColor;
		const layersSnaphot = [...layers.value].reverse();
		const objectsSnapshot: FabricObjectExtended[] = canvasValue.getObjects();
		const objectMap = new Map<string, FabricObjectExtended>();

		for (const object of objectsSnapshot) {
			if (object.id) objectMap.set(object.id, object);
		}

		canvasValue.clear();
		canvasValue.backgroundColor = backgroundSnapshot;

		for (let layer of layersSnaphot) {
			const object = objectMap.get(layer.key);
			if (!object) continue;

			canvasValue.add(object);
		}

		canvasValue.requestRenderAll();
	};

	onMounted(() => {
		updateLayers();
	});

	return {
		layers,
		selectedLayer,
		updateLayers,
		updateSelectedLayer,
		selectObjectsFromLayers,
		updateLayersOrder,
	};
};
