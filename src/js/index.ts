import Application from "./components/application";
import Assets from "./components/assets";
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

  app.addChild(new MenuScene(app.screen.width, app.screen.height).view);
})();
