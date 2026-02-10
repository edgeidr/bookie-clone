import { ActiveSelection, Point, Polyline, type Canvas, type FabricObject } from "fabric";

interface ObjectSides {
	left: number;
	top: number;
	right: number;
	bottom: number;
	centerX: number;
	centerY: number;
}

type SnapCandidate = { delta: number } | null;

export const useCanvasSnapping = (canvas: Ref<Canvas | null>) => {
	const snappingEnabled = ref(true);
	const snapTolerance = 5;
	const alignTolerance = 0.5;

	const getObjectSides = (object: FabricObject): ObjectSides => {
		object.setCoords();

		const rect = object.getBoundingRect();
		const left = rect.left;
		const top = rect.top;
		const right = left + rect.width;
		const bottom = top + rect.height;
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		return { left, top, right, bottom, centerX, centerY };
	};

	const snapLeftToLeft = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { left: objectLeft } = objectSides;
		const { left: otherLeft } = otherSides;

		if (!isClose(objectLeft, otherLeft)) return null;

		return { delta: otherLeft - objectLeft };
	};

	const snapRightToRight = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { right: objectRight } = objectSides;
		const { right: otherRight } = otherSides;

		if (!isClose(objectRight, otherRight)) return null;

		return { delta: otherRight - objectRight };
	};

	const snapLeftToRight = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { left: objectLeft } = objectSides;
		const { right: otherRight } = otherSides;

		if (!isClose(objectLeft, otherRight)) return null;

		return { delta: otherRight - objectLeft };
	};

	const snapRightToLeft = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { right: objectRight } = objectSides;
		const { left: otherLeft } = otherSides;

		if (!isClose(objectRight, otherLeft)) return null;

		return { delta: otherLeft - objectRight };
	};

	const snapCenterXToCenterX = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
	): SnapCandidate => {
		const { centerX: objectCenterX } = objectSides;
		const { centerX: otherCenterX } = otherSides;

		if (!isClose(objectCenterX, otherCenterX)) return null;

		return { delta: otherCenterX - objectCenterX };
	};

	const snapTopToTop = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { top: objectTop } = objectSides;
		const { top: otherTop } = otherSides;

		if (!isClose(objectTop, otherTop)) return null;

		return { delta: otherTop - objectTop };
	};

	const snapBottomToBottom = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
	): SnapCandidate => {
		const { bottom: objectBottom } = objectSides;
		const { bottom: otherBottom } = otherSides;

		if (!isClose(objectBottom, otherBottom)) return null;

		return { delta: otherBottom - objectBottom };
	};

	const snapTopToBottom = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { top: objectTop } = objectSides;
		const { bottom: otherBottom } = otherSides;

		if (!isClose(objectTop, otherBottom)) return null;

		return { delta: otherBottom - objectTop };
	};

	const snapBottomToTop = (objectSides: ObjectSides, otherSides: ObjectSides): SnapCandidate => {
		const { bottom: objectBottom } = objectSides;
		const { top: otherTop } = otherSides;

		if (!isClose(objectBottom, otherTop)) return null;

		return { delta: otherTop - objectBottom };
	};

	const snapCenterYToCenterY = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
	): SnapCandidate => {
		const { centerY: objectCenterY } = objectSides;
		const { centerY: otherCenterY } = otherSides;

		if (!isClose(objectCenterY, otherCenterY)) return null;

		const deltaY = otherCenterY - objectCenterY;

		return { delta: deltaY };
	};

	const snapToObjects = (object: FabricObject) => {
		const canvasValue = canvas.value;
		if (!canvasValue || !snappingEnabled.value) return { x: object.left, y: object.top };

		const objectSides = getObjectSides(object);
		const snapXCandidates: SnapCandidate[] = [];
		const snapYCandidates: SnapCandidate[] = [];

		canvasValue.getObjects().forEach((other) => {
			if (!isSnapCandidate(object, other)) return;

			const otherSides = getObjectSides(other);

			snapXCandidates.push(snapLeftToLeft(objectSides, otherSides));
			snapXCandidates.push(snapRightToRight(objectSides, otherSides));
			snapXCandidates.push(snapLeftToRight(objectSides, otherSides));
			snapXCandidates.push(snapRightToLeft(objectSides, otherSides));
			snapXCandidates.push(snapCenterXToCenterX(objectSides, otherSides));

			snapYCandidates.push(snapTopToTop(objectSides, otherSides));
			snapYCandidates.push(snapBottomToBottom(objectSides, otherSides));
			snapYCandidates.push(snapTopToBottom(objectSides, otherSides));
			snapYCandidates.push(snapBottomToTop(objectSides, otherSides));
			snapYCandidates.push(snapCenterYToCenterY(objectSides, otherSides));
		});

		const deltaX = getBestSnapCandidate(snapXCandidates)?.delta ?? 0;
		const deltaY = getBestSnapCandidate(snapYCandidates)?.delta ?? 0;

		return {
			x: object.left + deltaX,
			y: object.top + deltaY,
		};
	};

	const getBestSnapCandidate = (candidates: SnapCandidate[]) => {
		const filtered = candidates.filter((v) => v !== null);
		if (!filtered.length) return null;

		return filtered.reduce((best, current) => {
			const currentDelta = Math.abs(current.delta);
			const bestDelta = Math.abs(best.delta);

			return currentDelta < bestDelta ? current : best;
		});
	};

	const drawGuides = (object: FabricObject) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const objectSides = getObjectSides(object);

		canvasValue.getObjects().forEach((other) => {
			if (!isSnapCandidate(object, other)) return;

			const otherSides = getObjectSides(other);
			const xSnaps: [keyof ObjectSides, keyof ObjectSides][] = [
				["left", "left"],
				["right", "right"],
				["left", "right"],
				["right", "left"],
				["centerX", "centerX"],
			];
			const ySnaps: [keyof ObjectSides, keyof ObjectSides][] = [
				["top", "top"],
				["bottom", "bottom"],
				["top", "bottom"],
				["bottom", "top"],
				["centerY", "centerY"],
			];

			for (const [a, b] of xSnaps) {
				if (isAligned(objectSides[a], otherSides[b])) {
					createGuideLine(objectSides, otherSides, otherSides[b], "x");
				}
			}

			for (const [a, b] of ySnaps) {
				if (isAligned(objectSides[a], otherSides[b])) {
					createGuideLine(objectSides, otherSides, otherSides[b], "y");
				}
			}
		});
	};

	const isSnapCandidate = (object: FabricObject, other: FabricObject) => {
		if (other === object) return false;
		if ((other as any).excludeFromSnap) return false;
		if (
			object.isType("activeselection") &&
			(object as ActiveSelection).getObjects().includes(other)
		) {
			return false;
		}

		return true;
	};

	const isAligned = (a: number, b: number) => Math.abs(a - b) <= alignTolerance;

	const isClose = (a: number, b: number) => Math.abs(a - b) <= snapTolerance;

	const moveObject = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const activeObject = canvasValue.getActiveObject();
		if (!activeObject) return;

		removeGuidesLines();
		activeObject.setCoords();

		const { x: snappedX, y: snappedY } = snapToObjects(activeObject);

		activeObject.left = snappedX;
		activeObject.top = snappedY;
		activeObject.setCoords();
		drawGuides(activeObject);

		canvasValue.requestRenderAll();
	};

	const createGuideLine = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		snapTo: number,
		axis: "x" | "y",
	) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		let startX, startY, endX, endY;

		const {
			left: objectLeft,
			right: objectRight,
			top: objectTop,
			bottom: objectBottom,
		} = objectSides;
		const {
			left: otherLeft,
			right: otherRight,
			top: otherTop,
			bottom: otherBottom,
		} = otherSides;

		if (axis === "x") {
			startX = snapTo;
			endX = snapTo;

			startY = Math.min(objectTop, objectBottom, otherTop, otherBottom);
			endY = Math.max(objectTop, objectBottom, otherTop, otherBottom);
		} else {
			startX = Math.min(objectLeft, objectRight, otherLeft, otherRight);
			endX = Math.max(objectLeft, objectRight, otherLeft, otherRight);

			startY = snapTo;
			endY = snapTo;
		}

		const start = new Point(startX, startY);
		const end = new Point(endX, endY);

		const guide = new Polyline([start, end], {
			stroke: "#ff0000",
			strokeWidth: 1,
			selectable: false,
			evented: false,
			fill: "",
			excludeFromSnap: true,
		});

		canvasValue.add(guide);
	};

	const removeGuidesLines = () => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		canvasValue.getObjects().forEach((object) => {
			if (!(object as any).excludeFromSnap) return;
			canvasValue.remove(object);
		});

		canvasValue.requestRenderAll();
	};

	return { moveObject, removeGuidesLines };
};
