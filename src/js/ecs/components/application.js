import Container from "./container.js";

export default class Application {
  constructor() {
    const canvas = document.createElement("canvas");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stage = new Container(this.ctx, { isStage: true });
    this.children = [];
    this.screen = { width: window.innerWidth, height: window.innerHeight };

    canvas.addEventListener("mousemove", (e) =>
      this.handleMouseMove(e, this.children, []),
    );
    canvas.id = "canvas";
    document.body.appendChild(canvas);

    this._loop();
  }

  init = ({ resizeTo }) => {
    window.addEventListener("resize", this.onResize);
    this.canvas.width = resizeTo.innerWidth;
    this.canvas.height = resizeTo.innerHeight;
  };

  addChild(child) {
    this.children.push(child);

    return this;
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const child of this.children) child.render(this.ctx);

    requestAnimationFrame(this._loop.bind(this));
  }

  handleMouseMove(event, children, parents = []) {
    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    for (const child of children) {
      if (child instanceof Container) {
        return this.handleMouseMove(
          event,
          child.children,
          parents.concat(child),
        );
      }
      if (
        child.interactive &&
        child.isMouseOver(mouseX, mouseY, this.ctx, parents)
      ) {
        this.canvas.style.cursor = "pointer";
        return;
      }
    }
    this.canvas.style.cursor = "default";
  }
}
