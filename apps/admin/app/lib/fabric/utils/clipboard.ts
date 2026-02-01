import { ActiveSelection, FabricObject, type Canvas } from "fabric";
import { fabricObjectControlDefaults } from "../defaults/objectControlDefaults";

export class CanvasClipboard {
	private canvas: Canvas;
	private clipboard: FabricObject | ActiveSelection | null = null;
	private pasteOffset = 10;

	constructor(canvas: Canvas) {
		this.canvas = canvas;
	}

	async copy() {
		const active = this.canvas.getActiveObject();
		if (!active) return;

		this.clipboard = await active.clone();
	}

	async cut() {
		const active = this.canvas.getActiveObject();
		if (!active) return;

		await this.copy();

		if (active.type === "activeselection") {
			(active as ActiveSelection).forEachObject((obj) => this.canvas.remove(obj));
		} else {
			this.canvas.remove(active);
		}

		// this.canvas.discardActiveObject();
		this.canvas.requestRenderAll();
	}

	async paste() {
		if (!this.clipboard) return;

		const cloned = await this.clipboard.clone();

		this.canvas.discardActiveObject();

		cloned.set({
			left: (cloned.left ?? 0) + this.pasteOffset,
			top: (cloned.top ?? 0) + this.pasteOffset,
			...fabricObjectControlDefaults,
		});

		if (cloned.type === "activeSelection") {
			const selection = cloned as ActiveSelection;

			selection.canvas = this.canvas;

			selection.forEachObject((obj) => {
				obj.set({
					left: (obj.left ?? 0) + this.pasteOffset,
					top: (obj.top ?? 0) + this.pasteOffset,
				});

				obj.setCoords();
				this.canvas.add(obj);
			});

			this.canvas.setActiveObject(
				new ActiveSelection(selection.getObjects(), {
					canvas: this.canvas,
				}),
			);
		} else {
			cloned.setCoords();
			this.canvas.add(cloned);
			this.canvas.setActiveObject(cloned);
		}

		this.canvas.requestRenderAll();
		this.clipboard = cloned;
	}
}
