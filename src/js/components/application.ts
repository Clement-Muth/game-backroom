import Container from "./container";

export default class Application {
  public readonly canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public stage: Container;
  public screen: { width: number; height: number };

  private children: any[];
  private mouseX: number;
  private mouseY: number;

  constructor() {
    const canvas = document.createElement("canvas");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.stage = new Container(this.ctx, { isStage: true });
    this.children = [];
    this.screen = { width: window.innerWidth, height: window.innerHeight };
    this.mouseX = 0;
    this.mouseY = 0;

    canvas.addEventListener("mousemove", (e) =>
      this.onMouseMove(e, this.children, []),
    );
    canvas.addEventListener("click", (e) =>
      this.onClick(e, this.children, []),
    );
    canvas.id = "canvas";
    document.body.appendChild(canvas);

    this.loop();
  }

  public init = ({ background, resizeTo }: {background: string, resizeTo: any}) => {
    window.addEventListener("resize", this.onResize);
    this.ctx.fillStyle = background;
    this.canvas.width = resizeTo.innerWidth;
    this.canvas.height = resizeTo.innerHeight;
  };

  public addChild = (child: Container | Text) => {
    this.children.push(child);

    return this;
  }

  private onResize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private loop = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const child of this.children) child.render(this.ctx);

    requestAnimationFrame(this.loop.bind(this));
  }

  private onMouseMove = (event: MouseEvent, children: any, parents = [] as Container[]): void => {
    this.mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    this.mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    for (const child of children) {
      if (child instanceof Container) {
        this.onMouseMove(event, child.children, parents.concat(child));
        return;
      }
      if (
        child.interactive &&
        child.isMouseOver(this.mouseX, this.mouseY, this.ctx, parents)
      ) {
        this.canvas.style.cursor = "pointer";
        return;
      }
    }
    this.canvas.style.cursor = "default";
  }

  private onClick = (event: MouseEvent, children: any[], parents = [] as Container[]): void => {
    for (const child of children) {
      if (child instanceof Container) {
        return this.onClick(event, child.children, parents.concat(child));
      }
      if (child.interactive === true && typeof child._onClick === "function") {
        child._onClick(this.mouseX, this.mouseY, this.ctx, parents);
      }
    }
  }
}
