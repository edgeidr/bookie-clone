import { Point, Polygon, Polyline, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { applyObjectDefaults } from "./defaults/objectDefaults";

export const createPolylineTool = (canvas: Canvas): CanvasTool => {
	const CLOSE_DISTANCE = 8 * canvas.getZoom();
	const MIN_POLYGON_POINTS = 3;
	let polyline: Polyline | null = null;
	let points: Point[] = [];
	let isDrawing = false;

	const getPoint = (event: TPointerEventInfo) => {
		const { x, y } = event.scenePoint;
		return new Point(x, y);
	};

	const isNearFirstPoint = (point: Point) => {
		if (points.length < 3) return false;

		const { x: startX, y: startY } = points[0]!;
		const { x, y } = point;

		return Math.hypot(x - startX, y - startY) < CLOSE_DISTANCE;
	};

	const start = (point: Point) => {
		points = [point, point];
		isDrawing = true;

		polyline = new Polyline(points, {
			fill: "transparent",
			stroke: "#000000ff",
			strokeWidth: 1,
			selectable: false,
			evented: false,
			objectCaching: false,
			strokeUniform: true,
		});

		applyObjectDefaults(polyline);
		canvas.add(polyline);
	};

	const updatePreviewPoint = (point: Point) => {
		if (!polyline) return;

		points[points.length - 1] = point;
		polyline.set({ points });
		canvas.requestRenderAll();
	};

	const addPoint = (point: Point) => {
		points.splice(points.length - 1, 0, point);
	};

	const closePolyline = () => {
		if (!polyline || points.length < MIN_POLYGON_POINTS) return;

		const polygon = new Polygon(points, {
			fill: "#ffffffff",
			stroke: "#000000ff",
			strokeWidth: 1,
			strokeUniform: true,
			objectCaching: false,
			selectable: false,
			evented: false,
		});

		applyObjectDefaults(polygon);
		canvas.remove(polyline);
		canvas.add(polygon);
	};

	const stop = (close = false) => {
		if (!polyline || points.length < MIN_POLYGON_POINTS - 1) return;

		points.pop();

		if (close && points.length >= 3) {
			closePolyline();
		} else {
			polyline.set({
				selectable: false,
				evented: false,
			});
		}

		polyline = null;
		points = [];
		isDrawing = false;
		canvas.requestRenderAll();
	};

	const onMouseDown = (event: TPointerEventInfo) => {
		const evt = event.e as MouseEvent;

		if (evt.button === 2) {
			stop(false);
			return;
		}

		const point = getPoint(event);

		if (!isDrawing) {
			start(point);
			return;
		}

		if (isNearFirstPoint(point)) {
			stop(true);
			return;
		}

		addPoint(point);
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!isDrawing) return;
		updatePreviewPoint(getPoint(event));
	};

	const onDeactivate = () => {
		stop(false);
	};

	return {
		onMouseDown,
		onMouseMove,
		onDeactivate,
	};
};
