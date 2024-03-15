import Application from "./components/application.js";
import Assets from "./components/assets.js";
import MenuScene from "./scenes/menu/index.js";

(async () => {
  const app = new Application();

  app.init({ background: "transparent", resizeTo: window });

  await Assets.load([
    {
      alias: "background",
      src: "http://localhost:5500/public/static/images/menu/menu.jpg",
    },
  ]);

  app.addChild(new MenuScene(app.screen.width, app.screen.height).view);
})();
