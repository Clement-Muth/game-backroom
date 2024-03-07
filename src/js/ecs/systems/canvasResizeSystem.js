import System from "./system.js";

export default class CanvasResizeSystem extends System {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.updateCanvasSize();

    window.addEventListener("resize", this.updateCanvasSize.bind(this));
  }

  updateCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  update(entities) {}
}
