import { Container, Texture, TilingSprite } from "../../libraries/pixijs.js";
import Text from "./components/text.js";
import GameEngine from "./gameEngine.js";

export class Menu {
  constructor(width, gameEngine) {
    this.view = new Container();
    this.view.y = gameEngine.app.screen.height;
    this.gameEngine = gameEngine;
    this.app = gameEngine.app;

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

    const menuView = this.view.addChild(new Container());

    menuView
      .addChild(
        new Text("Play", {
          fontSize: 24,
          lineHeight: 28,
          letterSpacing: 0,
          fill: 0xffffff,
          align: "center",
        }),
      )
      .position.set(0, -100);

    menuView
      .addChild(
        new Text("Settings", {
          fontSize: 24,
          lineHeight: 28,
          letterSpacing: 0,
          fill: 0xffffff,
          align: "center",
        }),
      )
      .position.set(0, -50);

    const exitButton = new Text("Exit", {
      fontSize: 32,
      lineHeight: 28,
      letterSpacing: 0,
      fill: 0xffffff,
      align: "center",
    });

    menuView.addChild(exitButton).position.set(0, 0);

    exitButton.onClick(() => {
      window.close();
    });

    menuView.position.set(182, -200);
  }

  destructor = () => {
    this.app.ticker.stop();
    console.log(this.view);
    this.gameEngine.removeScene(this.view);
  };

  vibrate = () => {
    let step = 0;

    const handleVibration = () => {
      const keyframes = [0, -2.5, 2.5, 0, 2.5, -2.5, 0, -2.5, 2.5, 0];
      const currentValue = keyframes[step % keyframes.length];

      step++;
      return currentValue;
    };

    this.app.ticker.add(() => {
      this.background.x += handleVibration();
    });
  };
}

(async () => {
  const gameEngine = await new GameEngine().init();
  const menu = new Menu(gameEngine.app.screen.width, gameEngine);

  menu.vibrate();
  gameEngine.addScene(menu.view);
})();
