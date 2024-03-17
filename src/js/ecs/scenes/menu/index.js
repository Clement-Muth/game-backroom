<<<<<<< Updated upstream:src/js/ecs/scenes/menu/index.js
import Container from "../../components/container.js";
import Text from "../../components/text.js";
import Texture from "../../components/texture.js";
import TilingSprite from "../../components/tilingSprite.js";
=======
import Container from "../../components/container";
import Text from "../../components/text";
import Texture from "../../components/texture";
import TilingSprite from "../../components/tilingSprite";
import GameScene from "../game";
>>>>>>> Stashed changes:src/js/scenes/menu/index.ts

const getButtons = (app) => {
  const play = new Text({
    text: "PLAY TAPE  >",
    style: {
      fontSize: 32,
      fontFamily: "DotGothic16",
    },
  });

  play.interactive = true;
  play.onClick = () => {
    app.addChild(new GameScene(app.screen.width, app.screen.height).view);
  };

  const settings = new Text({
    text: "SETTINGS  >",
    style: {
      align: "left",
      whiteSpace: 10,
      fontSize: 32,
      fontFamily: "DotGothic16",
    },
  });

  settings.y = 80;
  settings.interactive = true;

  const exit = new Text({
    text: "EXIT  >",
    style: {
      align: "left",
      whiteSpace: 10,
      fontSize: 32,
      fontFamily: "DotGothic16",
    },
  });

  exit.y = 160;
  exit.interactive = true;

  const credits = new Text({
    text: "CREDITS  >",
    style: {
      align: "left",
      whiteSpace: 10,
      fontSize: 32,
      fill: "brown",
      fontFamily: "DotGothic16",
    },
  });

  credits.y = 240;
  credits.interactive = true;

  return { play, settings, exit, credits };
};

export default class MenuScene {
<<<<<<< Updated upstream:src/js/ecs/scenes/menu/index.js
  constructor(width, height) {
=======
  public view: Container;

  constructor(width: number, height: number, app) {
>>>>>>> Stashed changes:src/js/scenes/menu/index.ts
    this.view = new Container();
    const menu = new Container();

    const title = new Text({
      text: "THE BACKROOMS",
      style: { fontSize: 48, fontFamily: "DotGothic16" },
    });
    const { credits, exit, play, settings } = getButtons(app);

    const texture = Texture.from("background");

    const background = new TilingSprite({
      texture: texture,
      width,
      height,
    });

    this.view.x = 180;
    this.view.y = 240;

    menu.y = 100;

    this.view.addChild(
      background,
      title,
      menu.addChild(play, settings, exit, credits),
    );
  }
}
