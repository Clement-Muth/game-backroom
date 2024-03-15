export default class Container {
  constructor(ctx, options) {
    this.id = "container";
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    this.children = [];
    this.isStage = options?.isStage;
  }

  addChild(...children) {
    for (const child of children) {
      this.children.push(child);

      if (this.isStage) this.render();
    }

    return this;
  }

  getSize = () => {
    return { width: this.width, height: this.height };
  };

  render(ctx, parents = []) {
    const context = this.ctx ?? ctx;
    const allParents = parents.concat(this);

    for (const child of this.children)
      if (typeof child.render === "function") child.render(context, allParents);
  }
}
