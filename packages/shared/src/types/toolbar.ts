import type { ToolbarItemType } from "../enums/toolbar";

export interface ToolbarActionItem {
	type: ToolbarItemType.ACTION;
	icon: string;
	label: string;
	action?: (event?: any) => void;
}

export interface ToolbarDividerItem {
	type: ToolbarItemType.DIVIDER;
}

export type ToolbarItem = ToolbarActionItem | ToolbarDividerItem;
