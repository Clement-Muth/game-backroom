import Container from "../../components/container";
import Text from "../../components/text";
import Texture from "../../components/texture";
import TilingSprite from "../../components/tilingSprite";

export default class GameScene {
  public view: Container;

  constructor(width: number, height: number) {
    this.view = new Container();

    const title = new Text({
      text: "IN GAME SCENE",
      style: { fontSize: 48, fontFamily: "DotGothic16" },
    });

    this.view.x = 180;
    this.view.y = 240;

    const texture = Texture.from("background");

    const background = new TilingSprite({
      texture: texture,
      width,
      height,
    });

    this.view.addChild(background, title);
  }
}
