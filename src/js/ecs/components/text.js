export class TextStyle {
  constructor() {
    this.align = "left";
    this.fill = "white";
    this.fontFamily = "Arial";
    this.fontSize = 24;
    this.fontWeight = "normal";
  }
}

export default class Text {
  constructor({ text, style }) {
    this.x = 50;
    this.y = 50;
    this.text = text;
    this.interactive = false;
    this._style = { ...new TextStyle(), ...style };
  }

  render(ctx) {
    ctx.font = `${this._style.fontWeight} ${this._style.fontSize}px ${this._style.fontFamily}`;
    ctx.fillStyle = this._style.fill;
    ctx.textAlign = this._style.align;
    ctx.fillText(this.text, this.x, this.y);
  }

  isMouseOver(x, y, ctx) {
    const width = ctx.measureText(this.text).width;

    return (
      x >= this.x &&
      x <= this.x + width &&
      y >= this.y - this._style.fontSize &&
      y <= this.y
    );
  }
}
