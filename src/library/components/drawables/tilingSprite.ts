interface TilingSpriteProps {
  texture: string;
  width: number;
  height: number;
}

export default class TilingSprite {
  public texture: string;
  private width: number;
  private height: number;
  private image: HTMLImageElement;

  constructor({ texture, width, height }: TilingSpriteProps) {
    const image = new Image();
    image.src = texture;

    this.texture = texture;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  public update = (texture: string) => {
    this.image.src = texture;
  };

  public render = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  };
}
