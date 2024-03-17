export default class Container {
  public ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public children: any[];
  public isStage: boolean;

  constructor(ctx?: any, options?: any) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.children = [];
    this.isStage = options?.isStage;
  }

  public addChild<U extends any[]>(...children: U): U[0] {
    for (const child of children) {
      this.children.push(child);

      if (this.isStage) this.render(this.ctx, []);
    }

    return this;
  }

  public removeChild(childToRemove: any) {
    const index = this.children.indexOf(childToRemove);
    if (index !== -1) this.children.splice(index, 1);

    return this;
  }

  public render(ctx: any, parents = [] as Container[]) {
    const context = this.ctx ?? ctx;
    const allParents = parents.concat(this);

    for (const child of this.children) child.render(context, allParents);
  }
}
