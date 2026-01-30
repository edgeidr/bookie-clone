import { Point, Polygon, Polyline, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";
import { fabricObjectControlDefaults } from "./defaults/objectControlDefaults";

export const createPolylineTool = (canvas: Canvas): CanvasTool => {
	const CLOSE_DISTANCE = 8;
	const MIN_POLYLINE_POINTS = 2;
	const MIN_POLYGON_POINTS = 3;
	let polyline: Polyline | null = null;
	let points: Point[] = [];
	let isDrawing = false;

	const getPoint = (event: TPointerEventInfo) => {
		const { x, y } = event.scenePoint;
		return new Point(x, y);
	};

	const getCloseDistance = () => {
		return CLOSE_DISTANCE * canvas.getZoom();
	};

	const getRealPointsCount = () => {
		return Math.max(0, points.length - 1);
	};

	const isNearPreviousPoint = (a: Point, b: Point) => {
		return Math.hypot(a.x - b.x, a.y - b.y) < getCloseDistance();
	};

	const isNearFirstPoint = (point: Point) => {
		if (getRealPointsCount() < MIN_POLYGON_POINTS) return false;

		const { x: startX, y: startY } = points[0]!;
		const { x, y } = point;

		return Math.hypot(x - startX, y - startY) < getCloseDistance();
	};

	const updatePreviewPoint = (point: Point) => {
		if (!polyline) return;

		points[getRealPointsCount()] = point;
		polyline.set({ points });
		canvas.requestRenderAll();
	};

	const addPoint = (point: Point) => {
		points.splice(getRealPointsCount(), 0, point);
	};

	const onMouseDown = (event: TPointerEventInfo) => {
		if (handleRightClick(event)) return;

		const point = getPoint(event);

		if (tryStartDrawing(point)) return;
		if (skipPointIfNearPrevious(point)) return;
		if (closeIfNearFirstPoint(point)) return;

		addPoint(point);
	};

	const tryStartDrawing = (point: Point) => {
		if (isDrawing) return false;

		points = [point, point];
		isDrawing = true;

		startPolyline();

		return true;
	};

	const handleRightClick = (event: TPointerEventInfo) => {
		const evt = event.e as MouseEvent;
		if (evt.button !== 2) return false;

		stopPolyline();
		return true;
	};

	const onMouseMove = (event: TPointerEventInfo) => {
		if (!isDrawing) return;
		updatePreviewPoint(getPoint(event));
	};

	const skipPointIfNearPrevious = (point: Point) => {
		const lastRealPoint = points[getRealPointsCount() - 1];
		return !!lastRealPoint && isNearPreviousPoint(point, lastRealPoint);
	};

	const closeIfNearFirstPoint = (point: Point) => {
		if (!polyline) return false;
		if (!isNearFirstPoint(point)) return false;

		removePreviewPoint();

		const polygon = new Polygon([...points], {
			...fabricObjectDefaults,
			...fabricObjectControlDefaults,
			originX: "center",
			originY: "center",
		});

		canvas.remove(polyline);
		canvas.add(polygon);

		stopDrawing();

		return true;
	};

	const startPolyline = () => {
		polyline = new Polyline(points, {
			...fabricObjectDefaults,
			...fabricObjectControlDefaults,
			fill: "transparent",
		});

		canvas.add(polyline);
	};

	const stopPolyline = () => {
		if (!polyline) return;
		if (getRealPointsCount() < MIN_POLYLINE_POINTS) canvas.remove(polyline);

		removePreviewPoint();
		polyline.setBoundingBox(true);
		stopDrawing();
	};

	const stopDrawing = () => {
		polyline = null;
		points = [];
		isDrawing = false;
		canvas.requestRenderAll();
	};

	const removePreviewPoint = () => {
		if (points.length > 0) points.pop();
	};

	const onDeactivate = () => stopPolyline();

	return {
		onMouseDown,
		onMouseMove,
		onDeactivate,
	};
};
