import Container from "./container.js";

export default class Application {
  constructor() {
    const canvas = document.createElement("canvas");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stage = new Container(this.ctx, { isStage: true });
    this.children = [];
    this.screen = { width: window.innerWidth, height: window.innerHeight };
    this._mouseX = 0;
    this._mouseY = 0;

    canvas.addEventListener("mousemove", (e) =>
      this._onMouseMove(e, this.children, []),
    );
    canvas.addEventListener("click", (e) =>
      this._onClick(e, this.children, []),
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

  _onMouseMove(event, children, parents = []) {
    this._mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    this._mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    for (const child of children) {
      if (child instanceof Container) {
        return this._onMouseMove(event, child.children, parents.concat(child));
      }
      if (
        child.interactive &&
        child.isMouseOver(this._mouseX, this._mouseY, this.ctx, parents)
      ) {
        this.canvas.style.cursor = "pointer";
        return;
      }
    }
    this.canvas.style.cursor = "default";
  }

  _onClick(event, children, parents = []) {
    for (const child of children) {
      if (child instanceof Container) {
        return this._onClick(event, child.children, parents.concat(child));
      }
      if (child.interactive === true && typeof child._onClick === "function") {
        child._onClick(this._mouseX, this._mouseY, this.ctx, parents);
      }
    }
  }
}
