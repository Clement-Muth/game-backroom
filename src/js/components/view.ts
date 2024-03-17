import type Container from "./container";

export default class View {
  public render: (ctx: CanvasRenderingContext2D, parents: Container[]) => void;
  public interactive: boolean;
  public isMouseOver: (
    mouseX: number,
    mouseY: number,
    ctx: CanvasRenderingContext2D,
    parents: Container[],
  ) => boolean;
}
