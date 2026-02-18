import { Svg } from "@repo/assets";
import { FabricObject, Group, loadSVGFromString } from "fabric";
import { fabricObjectDefaults } from "../defaults/objectDefaults";

const svgTemplates = new Map<string, Group>();

export const preloadSVG = async (id: string, svgString: string) => {
	if (svgTemplates.has(id)) return;

	const loaded = await loadSVGFromString(svgString);
	const { fill, ..._fabricObjectDefaults } = fabricObjectDefaults;
	const group = new Group(loaded.objects as FabricObject[], {
		...loaded.options,
		originX: "left",
		originY: "top",
	});

	group.set({ isComponent: true });

	group.getObjects().forEach((child) => {
		child.set({
			..._fabricObjectDefaults,
			originX: "center",
			originY: "center",
			strokeWidth: 1,
		});
	});

	svgTemplates.set(id, group);
};

export const cloneSVG = async (id: string) => {
	const template = svgTemplates.get(id);

	if (!template) throw new Error(`SVG template ${id} not preloaded`);

	return template.clone();
};

export const preloadAllSVGs = async () => {
	await Promise.all([preloadSVG("Chair", Svg.ChairRaw)]);
	await Promise.all([preloadSVG("Arm Chair A", Svg.ArmChairARaw)]);
	await Promise.all([preloadSVG("Arm Chair B", Svg.ArmChairBRaw)]);
	await Promise.all([preloadSVG("Arm Chair C", Svg.ArmChairCRaw)]);
	await Promise.all([preloadSVG("Single Door", Svg.SingleDoorRaw)]);
	await Promise.all([preloadSVG("Double Door", Svg.DoubleDoorRaw)]);
	await Promise.all([preloadSVG("Sliding Door", Svg.SlidingDoorRaw)]);
	await Promise.all([preloadSVG("Direction Arrow", Svg.DirectionArrowRaw)]);
	await Promise.all([preloadSVG("Exit Sign", Svg.ExitSignRaw)]);
};
