import { Container, Texture, TilingSprite } from "../../../library";

enum Key {
  Forward = "KeyW",
  Backward = "KeyS",
  Left = "KeyA",
  Right = "KeyD",
}

export default class GameScene {
  public view: Container;
  private currentView = 1;

  constructor(width: number, height: number) {
    this.view = new Container();
    this.view.x = 180;
    this.view.y = 240;

    const texture = Texture.from("map1");

    const background = new TilingSprite({
      texture: texture,
      width,
      height,
    });

    this.view.addChild(background);

    document.addEventListener("keypress", (e) => {
      switch (e.code as Key) {
        case Key.Forward:
          if (this.currentView < 12) {
            this.currentView++;
            const newTexture = Texture.from(`map${this.currentView}`);

            background.update(newTexture);
          }
          break;
        case Key.Backward:
          if (this.currentView > 1) {
            this.currentView--;
            const newTexture = Texture.from(`map${this.currentView}`);

            background.update(newTexture);
          }
          break;
      }
    });
  }
}
