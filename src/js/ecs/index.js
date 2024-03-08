import {
  Application,
  Assets,
  Container,
  Texture,
  TilingSprite,
} from "../../libraries/pixijs.js";

export class Scene {
  constructor(width) {
    this.view = new Container();

    const backgroundTexture = Texture.from("background");

    const scale = 0.8240384615384616;

    const baseOptions = {
      tileScale: { x: scale, y: scale },
      anchor: { x: 0, y: 1 },
      applyAnchorToTexture: true,
    };

    this.background = new TilingSprite({
      texture: backgroundTexture,
      width,
      height: backgroundTexture.height * scale,
      ...baseOptions,
    });

    this.view.addChild(this.background);
  }
}

(async () => {
  const app = new Application();
  await app.init({ background: "white", resizeTo: window });

  document.body.appendChild(app.canvas);

  await Assets.load([
    {
      alias: "background",
      src: "/public/static/images/menu/menu.jpg",
    },
  ]);

  const scene = new Scene(app.screen.width, app.screen.height);

  scene.view.y = app.screen.height;

  app.stage.addChild(scene.view);
})();
