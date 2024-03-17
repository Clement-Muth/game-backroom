export default class Container {
    public ctx: any;
    public x: number;
    public y: number;
    public children: any[];
    public isStage: boolean;
    private width: number;
    private height: number;

  constructor(ctx?: any, options?: any) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    this.children = [];
    this.isStage = options?.isStage;
  }

  public addChild(...children: any[]) {
    for (const child of children) {
      this.children.push(child);

      if (this.isStage) this.render(this.ctx, []);
    }

    return this;
  }

  // public getSize = () => {
  //   return { width: this.width, height: this.height };
  // };

  private render(ctx: any, parents = [] as Container[]) {
    const context = this.ctx ?? ctx;
    const allParents = parents.concat(this);

    for (const child of this.children)
      if (typeof child.render === "function") child.render(context, allParents);
  }
}
