import type { ToolbarItemType } from "../enums/toolbar";
import type { Shortcut } from "./shortcut";

export interface ToolbarActionItem {
	type: ToolbarItemType.ACTION;
	icon: string;
	label: string;
	isActive?: boolean | ComputedRef<boolean>;
	isDisabled?: boolean | ComputedRef<boolean>;
	shortcut?: Shortcut;
	action?: (event?: any) => void;
}

export interface ToolbarDividerItem {
	type: ToolbarItemType.DIVIDER;
}

export type ToolbarItem = ToolbarActionItem | ToolbarDividerItem;
