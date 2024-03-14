import TilingSprite from "./components/TilingSprite.js";
import Application from "./components/application.js";
import Assets from "./components/assets.js";
import Container from "./components/container.js";
import Text from "./components/text.js";
import Texture from "./components/texture.js";

(async () => {
  const app = new Application();

  app.init({ background: "transparent", resizeTo: window });

  const menu = new Container();
  const image = new Container();

  await Assets.load([
    {
      alias: "background",
      src: "http://localhost:5500/public/static/images/menu/menu.jpg",
    },
  ]);

  const texture = Texture.from("background");

  const background = new TilingSprite({
    texture: texture,
    width: window.innerWidth,
    height: window.innerHeight,
    ctx: app.ctx,
  });

  image.addChild(background);

  menu.x = 180;
  menu.y = 240;

  const play = new Text({
    text: "PLAY  >",
    style: {
      fontSize: 32,
    },
  });

  const settings = new Text({
    text: "SETTINGS  >",
    style: {
      align: "left",
      whiteSpace: 10,
      fontSize: 32,
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
    },
  });

  credits.y = 240;
  credits.interactive = true;

  menu.addChild(play).addChild(settings).addChild(exit).addChild(credits);
  app.addChild(image).addChild(menu);
})();
