import type { Rect, RectProps } from "fabric";

export const normalizeRect = (rect: Rect) => {
	const scaleX = rect.scaleX ?? 1;
	const scaleY = rect.scaleY ?? 1;

	rect.set({
		width: rect.width * scaleX,
		height: rect.height * scaleY,
		scaleX: 1,
		scaleY: 1,
	} satisfies Partial<RectProps>);
};
