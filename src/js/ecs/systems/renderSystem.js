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
      const renderComponent = entity.getComponent("RenderComponent");

      if (renderComponent) {
        this.ctx.fillStyle = renderComponent.color;
        this.ctx.fillRect(
          entity.x,
          entity.y,
          renderComponent.width,
          renderComponent.height,
        );
      }
    }
  };
}
