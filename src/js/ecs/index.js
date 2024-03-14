import Application from "./components/application.js";
import Container from "./components/container.js";
import Text from "./components/text.js";

(async () => {
  const app = new Application();

  app.init({ background: "transparent", resizeTo: window });

  const menu = new Container();

  menu.position.set({ x: 200, y: 100 });

  const hello = new Text({
    text: "Hello",
  });

  const world = new Text({
    text: "World",
    style: {
      fill: "orange",
      align: "left",
      whiteSpace: 10,
    },
  });

  world.y = 100;
  world.interactive = true;

  menu.addChild(hello).addChild(world);
  app.addChild(menu);
})();
