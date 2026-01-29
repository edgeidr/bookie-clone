import type { Ellipse, EllipseProps } from "fabric";

export const normalizeEllipse = (ellipse: Ellipse) => {
	const scaleX = ellipse.scaleX ?? 1;
	const scaleY = ellipse.scaleY ?? 1;

	ellipse.set({
		rx: ellipse.rx * scaleX,
		ry: ellipse.ry * scaleY,
		scaleX: 1,
		scaleY: 1,
	} satisfies Partial<EllipseProps>);
};
