import { Application, Assets } from "../library";
import "../library/sw";
import MenuScene from "./scenes/menu";

(async () => {
  const app = new Application();

  await app.init({ background: "transparent", resizeTo: window });

  await Assets.load([
    Application.dataEngine.assets.menu.background,
    ...[...Array(Application.dataEngine.assets.map.max)].map((_, i) => ({
      alias: `map${i}`,
      src: `${Application.dataEngine.assets.map.path}/map${i}.jpeg`,
    })),
  ]);

  const menuScene = new MenuScene(app.screen.width, app.screen.height, app);

  app.stage.addChild(menuScene.view);
})();
