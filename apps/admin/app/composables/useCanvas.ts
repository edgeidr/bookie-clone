import type { Canvas, FabricObject } from "fabric";
import { normalizeObject } from "~/lib/fabric/normalize/normalizeObject";

const canvas = shallowRef<Canvas | null>(null);
const activeObject = reactive<{
	object: FabricObject | null;
	left: number;
	top: number;
	width: number;
	height: number;
	angle: number;
	strokeWidth: number;
	strokeColor: string;
	fillColor: string;
	borderRadius: number;
}>({
	object: null,
	left: 0,
	top: 0,
	width: 0,
	height: 0,
	angle: 0,
	strokeWidth: 0,
	strokeColor: "",
	fillColor: "",
	borderRadius: 0,
});

export const useCanvas = () => {
	const setCanvas = (newCanvas: Canvas) => {
		canvas.value = newCanvas;

		canvas.value.on("selection:created", updateActiveObject);
		canvas.value.on("selection:updated", updateActiveObject);
		canvas.value.on("selection:cleared", clearActiveObject);
		canvas.value.on("object:moving", updateActiveObject);
		canvas.value.on("object:scaling", updateActiveObject);
		canvas.value.on("object:rotating", updateActiveObject);
		canvas.value.on("object:modifyPoly", updateActiveObject);
		canvas.value.on("object:skewing", updateActiveObject);
		canvas.value.on("object:modified", (event) => {
			normalizeObject(event.target);
			updateActiveObject();
		});
	};

	const getCanvas = () => {
		return canvas.value;
	};

	const render = () => {
		canvas.value?.requestRenderAll();
	};

	const updateActiveObject = () => {
		const obj = canvas.value?.getActiveObject() ?? null;

		if (!obj) {
			clearActiveObject();
			return;
		}

		activeObject.object = obj;
		activeObject.left = obj.left ?? 0;
		activeObject.top = obj.top ?? 0;
		activeObject.width = obj.width ?? 0;
		activeObject.height = obj.height ?? 0;
		activeObject.angle = obj.angle ?? 0;
		activeObject.strokeWidth = obj.strokeWidth ?? 0;
		activeObject.strokeColor = obj.stroke?.toString() ?? "";
		activeObject.fillColor = obj.fill?.toString() ?? "";
		activeObject.borderRadius = "rx" in obj ? ((obj.rx as number) ?? 0) : 0;
	};

	const clearActiveObject = () => {
		activeObject.object = null;
		activeObject.left = 0;
		activeObject.top = 0;
		activeObject.width = 0;
		activeObject.height = 0;
		activeObject.angle = 0;
		activeObject.strokeWidth = 0;
		activeObject.strokeColor = "";
		activeObject.fillColor = "";
		activeObject.borderRadius = 0;
	};

	const applyActiveObjectChanges = () => {
		if (!activeObject.object) return;

		activeObject.object.set({
			left: activeObject.left,
			top: activeObject.top,
			width: activeObject.width,
			height: activeObject.height,
			angle: activeObject.angle,
			strokeWidth: activeObject.strokeWidth,
			stroke: activeObject.strokeColor,
			fill: activeObject.fillColor,
		});

		if ("rx" in activeObject.object) {
			activeObject.object.set({
				rx: activeObject.borderRadius,
				ry: activeObject.borderRadius,
			});
		}

		activeObject.object.setCoords();
		render();
	};

	return { getCanvas, setCanvas, render, activeObject, applyActiveObjectChanges };
};
