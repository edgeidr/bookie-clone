import { Canvas, type FabricObject } from "fabric";
import type { InjectionKey } from "vue";
import { createToolRegistry } from "~/lib/fabric";
import { normalizeObject } from "~/lib/fabric/normalize/normalizeObject";
import { handlePolyEditingForObject } from "~/lib/fabric/utils/polyEditing";
import { CanvasToolName, type CanvasTool, type CanvasToolOrComponent } from "~~/types/canvas";

export const canvasManagerKey: InjectionKey<ReturnType<typeof useCanvas>> = Symbol("canvasManager");

export const useInjectedCanvas = () => {
	const canvasManager = inject(canvasManagerKey);
	if (!canvasManager) throw new Error("Canvas Manager was not provided.");

	return canvasManager;
};

export const useCanvas = () => {
	const canvas = shallowRef<Canvas | null>(null);
	const canvasHistory = useCanvasHistory(canvas);
	const canvasEditing = useCanvasEditing(canvas, canvasHistory.pushCanvasState);
	const canvasClipboard = useCanvasClipboard(canvas, canvasHistory.pushCanvasState);
	const tools = ref<ReturnType<typeof createToolRegistry>>();
	const activeTool = ref<CanvasTool | undefined>();
	const activeToolName = ref<CanvasToolOrComponent>(CanvasToolName.SELECT);
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
		rx: number;
		ry: number;
	}>({
		object: null,
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		angle: 0,
		strokeWidth: 1,
		strokeColor: "",
		fillColor: "",
		rx: 0,
		ry: 0,
	});

	const initCanvas = (element: HTMLCanvasElement) => {
		canvas.value = new Canvas(element, {
			selection: false,
			backgroundColor: "#ffffff",
			width: 800,
			height: 600,
		});

		render();

		tools.value = createToolRegistry(canvas, canvasHistory.pushCanvasState);
		activeTool.value = tools.value[activeToolName.value];
		activeTool.value?.onActivate?.();

		canvas.value.on("mouse:down", (event) => activeTool.value?.onMouseDown?.(event));
		canvas.value.on("mouse:move", (event) => activeTool.value?.onMouseMove?.(event));
		canvas.value.on("mouse:up", (event) => activeTool.value?.onMouseUp?.(event));
		canvas.value.on("mouse:dblclick", (event) => activeTool.value?.onMouseDoubleClick?.(event));

		canvas.value.on("selection:cleared", clearActiveObject);
		canvas.value.on("object:moving", updateActiveObject);
		canvas.value.on("object:rotating", updateActiveObject);
		canvas.value.on("object:modifyPoly", updateActiveObject);

		canvas.value.on("selection:created", () => {
			updateSelection();
			updateActiveObject();
		});

		canvas.value.on("selection:updated", () => {
			updateSelection();
			updateActiveObject();
		});

		canvas.value.on("object:scaling", (event) => {
			const object = event.target;

			setObjectCaching(object, false);
			updateActiveObject();
		});

		canvas.value.on("object:skewing", (event) => {
			const object = event.target;

			setObjectCaching(object, false);
			updateActiveObject();
		});

		canvas.value.on("object:modified", (event) => {
			const object = event.target;

			setObjectCaching(object, true);
			normalizeObject(object);
			updateActiveObject();

			object.setCoords();
			render();

			canvasHistory.pushCanvasState();
		});

		setCanvasEventListeners();
	};

	const updateSelection = () => {
		const object = canvas.value?.getActiveObject() ?? null;
		if (object) handlePolyEditingForObject(canvas.value!, object);
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
		activeObject.strokeWidth = obj.strokeWidth ?? 1;
		activeObject.strokeColor = obj.stroke?.toString() ?? "";
		activeObject.fillColor = obj.fill?.toString() ?? "";
		activeObject.rx = "rx" in obj ? ((obj.rx as number) ?? 0) : 0;
		activeObject.ry = "ry" in obj ? ((obj.ry as number) ?? 0) : 0;
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
		activeObject.rx = 0;
		activeObject.ry = 0;
	};

	const applyActiveObjectChanges = () => {
		if (!canvas.value) return;
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

		if (activeObject.object.type === "rect") {
			activeObject.object.set({
				rx: activeObject.rx,
				ry: activeObject.rx,
			});
		}

		if (activeObject.object.type === "ellipse") {
			activeObject.object.set({
				rx: activeObject.rx,
				ry: activeObject.ry,
			});
		}

		activeObject.object.setCoords();
		render();

		canvas.value.fire("object:modified", { target: activeObject.object });
	};

	const setObjectCaching = (object: FabricObject, caching: boolean) => {
		if (!object) return;
		object.objectCaching = caching;
	};

	const setCanvasEventListeners = () => {
		if (!canvas.value) return;

		const canvasElement = canvas.value.upperCanvasEl;
		canvasElement.tabIndex = 0;
		canvasElement.style.outline = "none";
	};

	useCanvasShortcuts(
		{
			copy: canvasClipboard.copy,
			cut: canvasClipboard.cut,
			paste: canvasClipboard.paste,
			removeSelection: canvasEditing.removeSelection,
			undoCanvas: canvasHistory.undoCanvas,
			redoCanvas: canvasHistory.redoCanvas,
		},
		canvas,
	);

	watch(
		() => activeToolName.value,
		(toolName = CanvasToolName.SELECT) => {
			if (!tools.value) return;

			activeTool.value?.onDeactivate?.();
			activeTool.value = tools.value[toolName];
			activeTool.value?.onActivate?.();
		},
	);

	return {
		canvas,
		initCanvas,
		render,
		activeObject,
		activeToolName,
		applyActiveObjectChanges,
		...canvasClipboard,
		...canvasEditing,
		...canvasHistory,
	};
};
