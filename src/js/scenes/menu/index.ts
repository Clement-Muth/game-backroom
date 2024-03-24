import {
  type Application,
  Container,
  Text,
  Texture,
  TilingSprite,
} from "../../../library";
import GameScene from "../game";

const getButtons = (scene: MenuScene, app: Application) => {
  const play = new Text({
    text: "PLAY TAPE  >",
    style: {
      fontSize: 32,
      fontFamily: "DotGothic16",
    },
  });

  play.interactive = true;
  play.onClick = () => {
    app.stage.removeChild(scene.view);
    app.stage.addChild(
      new GameScene(app.screen.width, app.screen.height, app).view,
    );
  };

  const settings = new Text({
    text: "SETTINGS  >",
    style: {
      align: "left",
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
  public view: Container;

  constructor(width: number, height: number, app: Application) {
    this.view = new Container();
    const menu = new Container();

    const title = new Text({
      text: "THE BACKROOMS",
      style: { fontSize: 48, fontFamily: "DotGothic16" },
    });
    const { credits, exit, play, settings } = getButtons(this, app);

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
