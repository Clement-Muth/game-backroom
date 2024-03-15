export class TextStyle {
  constructor() {
    this.align = "left";
    this.fill = "white";
    this.fontFamily = "Arial";
    this.fontSize = 24;
    this.fontWeight = "normal";
    this.parent = { x: 0, y: 0 };
  }
}

export default class Text {
  constructor({ text, style }) {
    this.x = 0;
    this.y = 0;
    this.text = text;
    this.interactive = false;
    this._style = { ...new TextStyle(), ...style };
    this.onClick = () => null;
  }

  render(ctx, parents) {
    const absoluteX = parents.reduce((acc, parent) => acc + parent.x, 0);
    const absoluteY = parents.reduce((acc, parent) => acc + parent.y, 0);

    ctx.font = `${this._style.fontWeight} ${this._style.fontSize}px ${this._style.fontFamily}`;
    ctx.fillStyle = this._style.fill;
    ctx.textAlign = this._style.align;
    ctx.fillText(this.text, absoluteX + this.x, absoluteY + this.y);
  }

  isMouseOver(x, y, ctx, parents) {
    const absoluteX = parents.reduce((acc, parent) => acc + parent.x, 0);
    const absoluteY = parents.reduce((acc, parent) => acc + parent.y, 0);
    const width = ctx.measureText(this.text).width;

    return (
      x >= absoluteX + this.x &&
      x <= absoluteX + this.x + width &&
      y >= absoluteY + this.y - this._style.fontSize &&
      y <= absoluteY + this.y
    );
  }

  _onClick(x, y, ctx, parents) {
    if (this.isMouseOver(x, y, ctx, parents)) {
      if (typeof this.onClick === "function") {
        this.onClick();
      }
    }
  }
}
