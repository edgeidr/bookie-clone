import { Group, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { cloneSVG } from "./utils/svgPreload";

export const createPlaceTool = (canvas: Ref<Canvas | null>, toolName: string): CanvasTool => {
	let ghost: Group | null = null;

	const onMouseDown = async (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const { x, y } = event.scenePoint;
		const object = await cloneSVG(toolName);

		object.set({
			left: x,
			top: y,
			originX: "center",
			originY: "center",
			objectCaching: true,
			selectable: false,
			evented: false,
		});

		canvasValue.add(object);
		canvasValue.requestRenderAll();
	};

	const onMouseMove = async (event: TPointerEventInfo) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const { x, y } = event.scenePoint;

		if (!ghost) {
			ghost = await cloneSVG(toolName);
			ghost.set({
				originX: "center",
				originY: "center",
				objectCaching: true,
				selectable: false,
				evented: false,
				opacity: 0.5,
			});

			canvasValue.add(ghost);
		}

		ghost.set({ left: x, top: y });
		canvasValue.requestRenderAll();
	};

	const onMouseOut = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		removeGhost();
		canvasValue.requestRenderAll();
	};

	const onDeactivate = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		removeGhost();
		canvasValue.requestRenderAll();
		canvasValue.setCursor("default");
		canvasValue.defaultCursor = "default";
	};

	const onActivate = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		canvasValue.setCursor("none");
		canvasValue.defaultCursor = "none";
	};

	const removeGhost = () => {
		const canvasValue = canvas.value;
		if (!canvasValue || !ghost) return;

		canvasValue.remove(ghost);
		ghost = null;
	};

	return { onMouseOut, onMouseDown, onMouseMove, onActivate, onDeactivate };
};
