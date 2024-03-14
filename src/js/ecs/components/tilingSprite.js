export default class TilingSprite {
  constructor({ texture, width, height }) {
    const image = new Image();
    image.src = texture;

    this.width = width;
    this.height = height;
    this.image = image;
  }

  render = (ctx) => {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  };
}
