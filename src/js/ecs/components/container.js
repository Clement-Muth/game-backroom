import Position from "./position.js";

export default class Container {
  constructor(ctx, options) {
    this.id = "container";
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    this.position = new Position(0, 0);
    this.children = [];
    this.isStage = options?.isStage;
  }

  addChild(child) {
    this.children.push(child);

    if (this.isStage) this.render();

    return this;
  }

  getSize = () => {
    return { width: this.width, height: this.height };
  };

  render(ctx) {
    const context = this.ctx ?? ctx;

    context?.clearRect(0, 0, this.width, this.height);

    for (const child of this.children)
      if (typeof child.render === "function") child.render(context);

    context.canvas.addEventListener("mousemove", (event) => {
      for (const child of this.children) {
        child.handleMouseMove?.(event, context);
      }
    });
  }
}
