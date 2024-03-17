import { Application, Assets } from "../library";
import MenuScene from "./scenes/menu";

(async () => {
  const app = new Application();

  app.init({ background: "transparent", resizeTo: window });

  await Assets.load([
    {
      alias: "background",
      src: "/public/static/images/menu/menu.jpg",
    },
  ]);

  const menuScene = new MenuScene(app.screen.width, app.screen.height, app);

  app.stage.addChild(menuScene.view);
})();
