import { Point, Polygon, Polyline, type Canvas, type TPointerEventInfo } from "fabric";
import type { CanvasTool } from "~~/types/canvas";
import { fabricObjectDefaults } from "./defaults/objectDefaults";

export const createPolylineTool = (
	canvas: Ref<Canvas | null>,
	pushCanvasState: () => void,
	updateLayers: () => void,
): CanvasTool => {
	const { t } = useI18n();
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
		if (!canvas.value) return 0;
		return CLOSE_DISTANCE * canvas.value.getZoom();
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
		if (!canvas.value) return;
		if (!polyline) return;

		points[getRealPointsCount()] = point;
		polyline.set({ points });
		canvas.value.requestRenderAll();
	};

	const addPoint = (point: Point) => {
		points.splice(getRealPointsCount(), 0, point);
	};

	const onMouseDown = (event: TPointerEventInfo) => {
		if (handleRightClick(event)) return;

		const canvasValue = canvas.value;
		const evt = event.e as MouseEvent;
		if (!canvasValue) return;
		if (evt.button !== 0) return;

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
		if (!canvas.value) return false;
		if (!polyline) return false;
		if (!isNearFirstPoint(point)) return false;

		removePreviewPoint();

		const polygon = new Polygon([...points], {
			...fabricObjectDefaults,
		});

		polygon.set({ label: t("common.ui.polygon") });
		canvas.value.remove(polyline);
		canvas.value.add(polygon);

		stopDrawing();

		return true;
	};

	const startPolyline = () => {
		if (!canvas.value) return;

		polyline = new Polyline(points, {
			...fabricObjectDefaults,
			fill: "transparent",
		});

		polyline.set({ label: t("common.ui.polyline") });
		canvas.value.add(polyline);
	};

	const stopPolyline = () => {
		if (!canvas.value) return;
		if (!polyline) return;
		if (getRealPointsCount() < MIN_POLYLINE_POINTS) canvas.value.remove(polyline);

		removePreviewPoint();
		polyline.setBoundingBox(true);
		stopDrawing();
	};

	const stopDrawing = () => {
		if (!canvas.value) return;

		polyline = null;
		points = [];
		isDrawing = false;
		canvas.value.requestRenderAll();

		updateLayers();
		pushCanvasState();
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
