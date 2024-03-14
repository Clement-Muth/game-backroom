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
  }

  render(ctx, parent) {
    this.parent = { x: parent.x, y: parent.y };
    ctx.font = `${this._style.fontWeight} ${this._style.fontSize}px ${this._style.fontFamily}`;
    ctx.fillStyle = this._style.fill;
    ctx.textAlign = this._style.align;
    ctx.fillText(this.text, parent.x + this.x, parent.y + this.y);
  }

  isMouseOver(x, y, ctx) {
    const width = ctx.measureText(this.text).width;

    return (
      x >= this.x + this.parent.x &&
      x <= this.x + this.parent.x + width &&
      y >= this.y + this.parent.y - this._style.fontSize &&
      y <= this.y + this.parent.y
    );
  }
}
