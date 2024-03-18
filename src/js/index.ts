import { Application, Assets } from "../library";
import "../library/sw";
import MenuScene from "./scenes/menu";

(async () => {
  const app = new Application();

  app.init({ background: "transparent", resizeTo: window });

  await Assets.load([
    {
      alias: "background",
      src: "/public/static/images/menu/menu.jpg",
    },
    {
      alias: "map1",
      src: "/public/static/images/game/map/map1.jpeg",
    },
    {
      alias: "map2",
      src: "/public/static/images/game/map/map6.jpeg",
    },
    {
      alias: "map3",
      src: "/public/static/images/game/map/map12.jpeg",
    },
    // {
    //   alias: "map4",
    //   src: "/public/static/images/game/map/map4.jpeg",
    // },
    // {
    //   alias: "map5",
    //   src: "/public/static/images/game/map/map5.jpeg",
    // },
    // {
    //   alias: "map6",
    //   src: "/public/static/images/game/map/map6.jpeg",
    // },
    // {
    //   alias: "map7",
    //   src: "/public/static/images/game/map/map7.jpeg",
    // },
  ]);

  const menuScene = new MenuScene(app.screen.width, app.screen.height, app);

  app.stage.addChild(menuScene.view);
})();
