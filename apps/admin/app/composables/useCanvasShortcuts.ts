import type { Shortcut } from "@repo/shared";
import type { Canvas } from "fabric";

export const useCanvasShortcuts = (canvas: Canvas) => {
	const { copy, cut, paste } = useCanvasClipboard();
	const { removeSelection } = useCanvasEditing();

	const COPY_SHORTCUT: Shortcut = { key: "c", mod: true };
	const CUT_SHORTCUT: Shortcut = { key: "x", mod: true };
	const PASTE_SHORTCUT: Shortcut = { key: "v", mod: true };
	const DELETE_SHORTCUT: Shortcut = { key: "Delete" };

	const matchShortcut = (shortcut: Shortcut) => (event: KeyboardEvent) => {
		if (shortcut.mod && !(event.ctrlKey || event.metaKey)) return false;
		if (shortcut.shift && !event.shiftKey) return false;
		if (shortcut.alt && !event.altKey) return false;

		return event.key.toLowerCase() === shortcut.key.toLocaleLowerCase();
	};

	onKeyStroke(matchShortcut(COPY_SHORTCUT), () => copy(canvas), { target: canvas.upperCanvasEl });
	onKeyStroke(matchShortcut(CUT_SHORTCUT), () => cut(canvas), { target: canvas.upperCanvasEl });
	onKeyStroke(matchShortcut(PASTE_SHORTCUT), () => paste(canvas), {
		target: canvas.upperCanvasEl,
	});
	onKeyStroke(matchShortcut(DELETE_SHORTCUT), () => removeSelection(canvas), {
		target: canvas.upperCanvasEl,
	});
};
