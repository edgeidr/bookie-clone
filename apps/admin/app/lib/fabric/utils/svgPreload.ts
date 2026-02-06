import { Svg } from "@repo/assets";
import { FabricObject, Group, loadSVGFromString } from "fabric";
import { fabricObjectDefaults } from "../defaults/objectDefaults";

const svgTemplates = new Map<string, Group>();

export const preloadSVG = async (id: string, svgString: string) => {
	if (svgTemplates.has(id)) return;

	const loaded = await loadSVGFromString(svgString);
	const group = new Group(loaded.objects as FabricObject[], loaded.options);

	group.getObjects().forEach((child) =>
		child.set({
			...fabricObjectDefaults,
			originX: "center",
			originY: "center",
			fill: "#a1a1a1ff",
			strokeWidth: 1,
		}),
	);

	svgTemplates.set(id, group);
};

export const cloneSVG = (id: string) => {
	const template = svgTemplates.get(id);
	if (!template) throw new Error(`SVG template ${id} not preloaded`);

	return template.clone();
};

export const preloadAllSVGs = async () => {
	await Promise.all([preloadSVG("seatA", Svg.SeatA)]);
	await Promise.all([preloadSVG("seatB", Svg.SeatB)]);
	await Promise.all([preloadSVG("seatC", Svg.SeatC)]);
};
