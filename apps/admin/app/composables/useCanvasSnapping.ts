import { Point, Polyline, type Canvas, type FabricObject } from "fabric";

interface ObjectSides {
	left: number;
	top: number;
	right: number;
	bottom: number;
	centerX: number;
	centerY: number;
}

type SnapCandidate = {
	value: number;
	delta: number;
} | null;

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

	const snapLeftToLeft = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosX: number,
	): SnapCandidate => {
		const { left: objectLeft } = objectSides;
		const { left: otherLeft } = otherSides;

		if (!isClose(objectLeft, otherLeft)) return null;

		const deltaX = otherLeft - objectLeft;
		const snappedX = objectPosX + deltaX;

		return {
			value: snappedX,
			delta: Math.abs(deltaX),
		};
	};

	const snapRightToRight = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosX: number,
	): SnapCandidate => {
		const { right: objectRight } = objectSides;
		const { right: otherRight } = otherSides;

		if (!isClose(objectRight, otherRight)) return null;

		const deltaX = otherRight - objectRight;
		const snappedX = objectPosX + deltaX;

		return {
			value: snappedX,
			delta: Math.abs(deltaX),
		};
	};

	const snapLeftToRight = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosX: number,
	): SnapCandidate => {
		const { left: objectLeft } = objectSides;
		const { right: otherRight } = otherSides;

		if (!isClose(objectLeft, otherRight)) return null;

		const deltaX = otherRight - objectLeft;
		const snappedX = objectPosX + deltaX;

		return {
			value: snappedX,
			delta: Math.abs(deltaX),
		};
	};

	const snapRightToLeft = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosX: number,
	): SnapCandidate => {
		const { right: objectRight } = objectSides;
		const { left: otherLeft } = otherSides;

		if (!isClose(objectRight, otherLeft)) return null;

		const deltaX = otherLeft - objectRight;
		const snappedX = objectPosX + deltaX;

		return {
			value: snappedX,
			delta: Math.abs(deltaX),
		};
	};

	const snapCenterXToCenterX = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosX: number,
	): SnapCandidate => {
		const { centerX: objectCenterX } = objectSides;
		const { centerX: otherCenterX } = otherSides;

		if (!isClose(objectCenterX, otherCenterX)) return null;

		const deltaX = otherCenterX - objectCenterX;
		const snappedX = objectPosX + deltaX;

		return {
			value: snappedX,
			delta: Math.abs(deltaX),
		};
	};

	const snapTopToTop = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosY: number,
	): SnapCandidate => {
		const { top: objectTop } = objectSides;
		const { top: otherTop } = otherSides;

		if (!isClose(objectTop, otherTop)) return null;

		const deltaY = otherTop - objectTop;
		const snappedY = objectPosY + deltaY;

		return {
			value: snappedY,
			delta: Math.abs(deltaY),
		};
	};

	const snapBottomToBottom = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosY: number,
	): SnapCandidate => {
		const { bottom: objectBottom } = objectSides;
		const { bottom: otherBottom } = otherSides;

		if (!isClose(objectBottom, otherBottom)) return null;

		const deltaY = otherBottom - objectBottom;
		const snappedY = objectPosY + deltaY;

		return {
			value: snappedY,
			delta: Math.abs(deltaY),
		};
	};

	const snapTopToBottom = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosY: number,
	): SnapCandidate => {
		const { top: objectTop } = objectSides;
		const { bottom: otherBottom } = otherSides;

		if (!isClose(objectTop, otherBottom)) return null;

		const deltaY = otherBottom - objectTop;
		const snappedY = objectPosY + deltaY;

		return {
			value: snappedY,
			delta: Math.abs(deltaY),
		};
	};

	const snapBottomToTop = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosY: number,
	): SnapCandidate => {
		const { bottom: objectBottom } = objectSides;
		const { top: otherTop } = otherSides;

		if (!isClose(objectBottom, otherTop)) return null;

		const deltaY = otherTop - objectBottom;
		const snappedY = objectPosY + deltaY;

		return {
			value: snappedY,
			delta: Math.abs(deltaY),
		};
	};

	const snapCenterYToCenterY = (
		objectSides: ObjectSides,
		otherSides: ObjectSides,
		objectPosY: number,
	): SnapCandidate => {
		const { centerY: objectCenterY } = objectSides;
		const { centerY: otherCenterY } = otherSides;

		if (!isClose(objectCenterY, otherCenterY)) return null;

		const deltaY = otherCenterY - objectCenterY;
		const snappedY = objectPosY + deltaY;

		return {
			value: snappedY,
			delta: Math.abs(deltaY),
		};
	};

	const snapToObjects = (object: FabricObject) => {
		const canvasValue = canvas.value;
		if (!canvasValue || !snappingEnabled.value) return { x: object.left, y: object.top };

		const objectSides = getObjectSides(object);
		const snapXCandidates: SnapCandidate[] = [];
		const snapYCandidates: SnapCandidate[] = [];

		canvasValue.getObjects().forEach((other) => {
			if (other === object) return;
			if ((other as any).excludeFromSnap) return;

			const otherSides = getObjectSides(other);

			snapXCandidates.push(snapLeftToLeft(objectSides, otherSides, object.left));
			snapXCandidates.push(snapRightToRight(objectSides, otherSides, object.left));
			snapXCandidates.push(snapLeftToRight(objectSides, otherSides, object.left));
			snapXCandidates.push(snapRightToLeft(objectSides, otherSides, object.left));
			snapXCandidates.push(snapCenterXToCenterX(objectSides, otherSides, object.left));

			snapYCandidates.push(snapTopToTop(objectSides, otherSides, object.top));
			snapYCandidates.push(snapBottomToBottom(objectSides, otherSides, object.top));
			snapYCandidates.push(snapTopToBottom(objectSides, otherSides, object.top));
			snapYCandidates.push(snapBottomToTop(objectSides, otherSides, object.top));
			snapYCandidates.push(snapCenterYToCenterY(objectSides, otherSides, object.top));
		});

		const snappedX = getBestSnapCandidate(snapXCandidates)?.value ?? object.left;
		const snappedY = getBestSnapCandidate(snapYCandidates)?.value ?? object.top;

		return { x: snappedX, y: snappedY };
	};

	const getBestSnapCandidate = (candidates: SnapCandidate[]) => {
		const filtered = candidates.filter((v) => v !== null);
		if (!filtered.length) return null;

		return filtered.reduce((best, current) => (current.delta < best.delta ? current : best));
	};

	const drawGuides = (object: FabricObject) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		const objectSides = getObjectSides(object);

		canvasValue.getObjects().forEach((other) => {
			if (other === object) return;
			if ((other as any).excludeFromSnap) return;

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

	const isAligned = (a: number, b: number) => Math.abs(a - b) <= alignTolerance;

	const isClose = (a: number, b: number) => Math.abs(a - b) <= snapTolerance;

	const moveObject = (object: FabricObject) => {
		const canvasValue = canvas.value;
		if (!canvasValue) return;

		removeGuidesLines();
		object.setCoords();

		const { x: snappedX, y: snappedY } = snapToObjects(object);

		object.left = snappedX;
		object.top = snappedY;
		object.setCoords();
		drawGuides(object);

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
