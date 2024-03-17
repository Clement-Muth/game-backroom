import type Container from "../containers/container";
import type View from "../containers/view";

export class TextStyle {
  public align?: "left" | "right" | "center";
  public fill?: string;
  public fontFamily?: string;
  public fontSize?: number;
  public fontWeight?: "normal" | "bold" | "semibold";
  public parent?: { x: number; y: number };

  constructor() {
    this.align = "left";
    this.fill = "white";
    this.fontFamily = "Arial";
    this.fontSize = 24;
    this.fontWeight = "normal";
    this.parent = { x: 0, y: 0 };
  }
}

export default class Text implements View {
  public x: number;
  public y: number;
  public text: string;
  public interactive: boolean;
  public onClick: () => void;
  private style: TextStyle;

  constructor({ text, style }: { text: string; style?: TextStyle }) {
    this.x = 0;
    this.y = 0;
    this.text = text;
    this.interactive = false;
    this.style = { ...new TextStyle(), ...style };
    this.onClick = () => null;
  }

  public render = (ctx: CanvasRenderingContext2D, parents: Container[]) => {
    const absoluteX = parents.reduce((acc, parent) => acc + parent.x, 0);
    const absoluteY = parents.reduce((acc, parent) => acc + parent.y, 0);

    ctx.font = `${this.style.fontWeight} ${this.style.fontSize}px ${this.style.fontFamily}`;
    ctx.fillStyle = this.style.fill!;
    ctx.textAlign = this.style.align!;
    ctx.fillText(this.text, absoluteX + this.x, absoluteY + this.y);
  };

  public isMouseOver = (
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    parents: Container[],
  ) => {
    const absoluteX = parents.reduce((acc, parent) => acc + parent.x, 0);
    const absoluteY = parents.reduce((acc, parent) => acc + parent.y, 0);
    const width = ctx.measureText(this.text).width;

    return (
      x >= absoluteX + this.x &&
      x <= absoluteX + this.x + width &&
      y >= absoluteY + this.y - this.style.fontSize! &&
      y <= absoluteY + this.y
    );
  };

  public _onClick = (
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    parents: Container[],
  ) => {
    if (this.isMouseOver(x, y, ctx, parents)) {
      if (typeof this.onClick === "function") {
        this.onClick();
      }
    }
  };
}
