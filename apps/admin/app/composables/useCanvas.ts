import { Canvas, InteractiveFabricObject, type FabricObject } from "fabric";
import type { InjectionKey } from "vue";
import { createToolRegistry } from "~/lib/fabric";
import { fabricObjectControlDefaults } from "~/lib/fabric/defaults/objectControlDefaults";
import { normalizeObject } from "~/lib/fabric/normalize/normalizeObject";
import { handlePolyEditingForObject } from "~/lib/fabric/utils/polyEditing";
import {
	CanvasToolName,
	type CanvasProperties,
	type CanvasTool,
	type CanvasToolOrComponent,
} from "~~/types/canvas";
import { useCanvasViewport } from "./useCanvasViewport";
import { preloadAllSVGs } from "~/lib/fabric/utils/svgPreload";
import { fabricObjectSnapDefaults } from "~/lib/fabric/defaults/objectSnapDefaults";

export const canvasManagerKey: InjectionKey<ReturnType<typeof useCanvas>> = Symbol("canvasManager");

export const useInjectedCanvas = () => {
	const canvasManager = inject(canvasManagerKey);
	if (!canvasManager) throw new Error("Canvas Manager was not provided.");

	return canvasManager;
};

export const useCanvas = () => {
	const canvasProperties = reactive<CanvasProperties>({
		isSnappingEnabled: true,
	});

	const activeToolName = ref<CanvasToolOrComponent>(CanvasToolName.SELECT);
	const canvas = shallowRef<Canvas | null>(null);
	const canvasHistory = useCanvasHistory(canvas);
	const canvasEditing = useCanvasEditing(canvas, canvasHistory.pushCanvasState, activeToolName);
	const canvasClipboard = useCanvasClipboard(
		canvas,
		canvasHistory.pushCanvasState,
		canvasEditing.removeSelection,
	);
	const canvasViewport = useCanvasViewport(canvas, canvasEditing);
	const canvasSnapping = useCanvasSnapping(canvas, canvasProperties);
	const tools = ref<ReturnType<typeof createToolRegistry>>();
	const activeTool = ref<CanvasTool | undefined>();

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
		canvas.value = new Canvas(element, { selection: false });

		render();
		preloadAllSVGs();
		setObjectControlDefaults();
		initCanvasTools();
		bindCanvasObjectEvents();
		enableCanvasFocus();
	};

	const bindCanvasObjectEvents = () => {
		if (!canvas.value) return;

		canvas.value.on("selection:cleared", clearActiveObject);
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

			canvasSnapping.removeGuidesLines();
			setObjectCaching(object, true);
			normalizeObject(object);
			updateActiveObject();

			object.setCoords();
			render();

			canvasHistory.pushCanvasState();
		});

		canvas.value.on("object:moving", (event) => {
			updateActiveObject();
			canvasSnapping.moveObject();
		});

		canvas.value.on("object:rotating", () => {
			updateActiveObject();
			canvas.value?.setCursor("grabbing");
		});
	};

	const initCanvasTools = () => {
		if (!canvas.value) return;

		tools.value = createToolRegistry(canvas, canvasHistory.pushCanvasState);

		canvas.value.on("mouse:over", (event) => activeTool.value?.onMouseOver?.(event));
		canvas.value.on("mouse:out", (event) => activeTool.value?.onMouseOut?.(event));
		canvas.value.on("mouse:down", (event) => activeTool.value?.onMouseDown?.(event));
		canvas.value.on("mouse:move", (event) => activeTool.value?.onMouseMove?.(event));
		canvas.value.on("mouse:up", (event) => activeTool.value?.onMouseUp?.(event));
		canvas.value.on("mouse:dblclick", (event) => activeTool.value?.onMouseDoubleClick?.(event));
	};

	const updateSelection = () => {
		const object = canvas.value?.getActiveObject() ?? null;
		if (object) handlePolyEditingForObject(canvas.value!, object);
	};

	const render = () => {
		canvas.value?.requestRenderAll();
	};

	const applyCanvasPropertyChanges = () => {
		if (!canvas.value) return;

		render();
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

		const before = activeObject.object.getCenterPoint();

		activeObject.object.set({
			angle: activeObject.angle,
		});

		const after = activeObject.object.getCenterPoint();

		activeObject.object.set({
			left: activeObject.left + before.x - after.x,
			top: activeObject.top + before.y - after.y,
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

	const enableCanvasFocus = () => {
		if (!canvas.value) return;

		const canvasElement = canvas.value.upperCanvasEl;
		canvasElement.tabIndex = 0;
		canvasElement.style.outline = "none";
	};

	const setObjectControlDefaults = () => {
		InteractiveFabricObject.ownDefaults = {
			...InteractiveFabricObject.ownDefaults,
			...fabricObjectControlDefaults,
			...fabricObjectSnapDefaults,
		};
	};

	useCanvasShortcuts(
		{
			copy: canvasClipboard.copy,
			cut: canvasClipboard.cut,
			paste: canvasClipboard.paste,
			moveSelection: canvasEditing.moveSelection,
			removeSelection: canvasEditing.removeSelection,
			undoCanvas: canvasHistory.undoCanvas,
			redoCanvas: canvasHistory.redoCanvas,
			canvasEditing: canvasEditing,
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
		{ immediate: true },
	);

	watch(canvasProperties, () => {
		applyCanvasPropertyChanges();
	});

	return {
		canvas,
		initCanvas,
		render,
		activeObject,
		activeToolName,
		applyActiveObjectChanges,
		canvasProperties,
		applyCanvasPropertyChanges,
		...canvasClipboard,
		...canvasEditing,
		...canvasHistory,
		...canvasViewport,
	};
};
