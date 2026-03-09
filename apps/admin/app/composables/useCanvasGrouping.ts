import { ActiveSelection, Group, type Canvas } from "fabric";

export const useCanvasGrouping = (
	canvas: Ref<Canvas | null>,
	canvasLayers: ReturnType<typeof useCanvasLayers>,
	canvasHistory: ReturnType<typeof useCanvasHistory>,
) => {
	const group = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject = canvasValue.getActiveObject();
		if (!activeObject) return;
		if (activeObject.type !== "activeselection") return;

		const selection = activeObject as ActiveSelection;
		const objects = selection.getObjects();
		const canvasObjects = canvasValue.getObjects();
		const groupIndex = Math.min(...objects.map((object) => canvasObjects.indexOf(object)));

		canvasValue.discardActiveObject();
		objects.forEach((object) => canvasValue.remove(object));

		const group = new Group(objects, { label: "Group" });

		canvasValue.insertAt(groupIndex, group);
		canvasValue.setActiveObject(group);
		canvasLayers.updateLayers();
		canvasValue.requestRenderAll();
		canvasHistory.pushCanvasState();
	};

	const ungroup = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject = canvasValue.getActiveObject();
		if (!activeObject) return;
		if (activeObject.type !== "group") return;
		if (activeObject.isComponent) return;

		const group = activeObject as Group;
		const canvasObjects = canvasValue.getObjects();
		const groupIndex = canvasObjects.indexOf(group);

		canvasValue.discardActiveObject();
		canvasValue.remove(group);

		const objects = group.removeAll();

		objects.forEach((object, index) => {
			canvasValue.insertAt(groupIndex + index, object);
		});

		canvasValue.setActiveObject(new ActiveSelection(objects, { canvas: canvasValue }));
		canvasLayers.updateLayers();
		canvasValue.requestRenderAll();
		canvasHistory.pushCanvasState();
	};

	const groupOrUngroup = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject = canvasValue.getActiveObject();
		if (!activeObject) return;

		if (activeObject.type === "group" && !activeObject.isComponent) {
			ungroup();
		} else {
			group();
		}
	};

	return { group, ungroup, groupOrUngroup };
};
