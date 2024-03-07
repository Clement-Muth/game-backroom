import AudioComponent from "./components/audioComponent.js";
import Entity from "./entities/entity.js";
import SquareEntity from "./entities/squareEntity.js";
import GameEngine from "./gameEngine.js";
import AudioSystem from "./systems/audioSystem.js";
import CanvasResizeSystem from "./systems/canvasResizeSystem.js";
import RenderSystem from "./systems/renderSystem.js";

export default () => {
  const canvas = document.getElementById("game-engine-canvas");
  const gameEngine = new GameEngine(canvas);
  const canvasResizeSystem = new CanvasResizeSystem(canvas);
  const audioComponent = new AudioComponent(
    "./public/static/music/government-funding.mp3",
  );
  const audioEntity = new Entity();

  audioEntity.addComponent(audioComponent);
  gameEngine.addEntity(audioEntity);

  const audioSystem = new AudioSystem();

  gameEngine.addSystem(canvasResizeSystem);
  gameEngine.addSystem(audioSystem);
  gameEngine.addEntity(new SquareEntity(50, 50, "red", 50, 50));
  gameEngine.addSystem(new RenderSystem(canvas));

  gameEngine.start();
};
