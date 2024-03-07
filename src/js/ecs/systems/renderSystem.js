import System from "./system.js";

export default class RenderSystem extends System {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  update = (entities) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const entity of entities) {
      const position = entity.getComponent("PositionComponent");
      const size = entity.getComponent("SizeComponent");
      const color = entity.getComponent("ColorComponent");

      if (position && size && color) {
        this.ctx.fillStyle = color.color;
        this.ctx.fillRect(position.x, position.y, size.width, size.height);
      }
    }
  };
}
