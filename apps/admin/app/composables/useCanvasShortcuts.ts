import type { Shortcut } from "@repo/shared";
import type { Canvas } from "fabric";
import { CanvasToolName, type CanvasToolOrComponent } from "~~/types/canvas";

interface CanvasActions {
	copy: () => void;
	cut: () => void;
	paste: () => void;
	removeSelection: () => void;
	undoCanvas: () => void;
	redoCanvas: () => void;
	canvasEditing: ReturnType<typeof useCanvasEditing>;
}

export const useCanvasShortcuts = (actions: CanvasActions, canvas: Ref<Canvas | null>) => {
	const { copy, cut, paste, removeSelection, undoCanvas, redoCanvas, canvasEditing } = actions;
	let attached = false;

	const COPY_SHORTCUT: Shortcut = { key: "c", mod: true };
	const CUT_SHORTCUT: Shortcut = { key: "x", mod: true };
	const PASTE_SHORTCUT: Shortcut = { key: "v", mod: true };
	const DELETE_SHORTCUT: Shortcut = { key: "Delete" };
	const UNDO_SHORTCUT: Shortcut = { key: "z" };
	const REDO_SHORTCUT: Shortcut = { key: "y" };
	const PEN_TOOL_SHORTCUT: Shortcut = { key: "p", alt: true };
	const SELECT_SHORTCUT: Shortcut = { key: "s", alt: true };

	const matchShortcut = (shortcut: Shortcut) => (event: KeyboardEvent) => {
		if (shortcut.mod && !(event.ctrlKey || event.metaKey)) return false;
		if (shortcut.shift && !event.shiftKey) return false;
		if (shortcut.alt && !event.altKey) return false;

		return event.key.toLowerCase() === shortcut.key.toLocaleLowerCase();
	};

	watch(
		canvas,
		(canvasValue) => {
			if (!canvasValue || attached) return;

			const target = canvasValue.upperCanvasEl;
			attached = true;

			onKeyStroke(matchShortcut(COPY_SHORTCUT), () => copy(), { target });
			onKeyStroke(matchShortcut(CUT_SHORTCUT), () => cut(), { target });
			onKeyStroke(matchShortcut(PASTE_SHORTCUT), () => paste(), { target });
			onKeyStroke(matchShortcut(DELETE_SHORTCUT), () => removeSelection(), { target });
			onKeyStroke(matchShortcut(UNDO_SHORTCUT), () => undoCanvas(), { target });
			onKeyStroke(matchShortcut(REDO_SHORTCUT), () => redoCanvas(), { target });
			onKeyStroke(
				matchShortcut(PEN_TOOL_SHORTCUT),
				() => canvasEditing.selectTool(CanvasToolName.PENTOOL),
				{ target: document },
			);
			onKeyStroke(
				matchShortcut(SELECT_SHORTCUT),
				() => canvasEditing.selectTool(CanvasToolName.SELECT),
				{
					target: document,
				},
			);
		},
		{ immediate: true },
	);
};
