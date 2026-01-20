import type { ToolbarItemType } from "../enums/toolbar";

export interface ToolbarActionItem {
	type: ToolbarItemType.ACTION;
	icon: string;
	label: string;
}

export interface ToolbarDividerItem {
	type: ToolbarItemType.DIVIDER;
}

export type ToolbarItem = ToolbarActionItem | ToolbarDividerItem;
