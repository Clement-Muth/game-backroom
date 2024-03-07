import AudioComponent from "./components/audioComponent.js";
import SceneComponent from "./components/sceneComponent.js";
import Entity from "./entities/entity.js";
import SquareEntity from "./entities/squareEntity.js";
import GameEngine from "./gameEngine.js";
import AudioSystem from "./systems/audioSystem.js";
import ButtonClickSystem from "./systems/buttonClickSystem.js";
import CanvasResizeSystem from "./systems/canvasResizeSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import SceneSystem from "./systems/sceneSystem.js";

export default () => {
  const canvas = document.getElementById("game-engine-canvas");
  const gameEngine = new GameEngine(canvas);
  const canvasResizeSystem = new CanvasResizeSystem(canvas);
  const audioComponent = new AudioComponent(
    "./public/static/music/government-funding.mp3",
  );

  const squareEntity = new SquareEntity(50, 50, 10, 10, "orange");

  const audioEntity = new Entity();
  const audioSystem = new AudioSystem();

  const loadingSceneComponent = new SceneComponent("loadingScene");
  const loadingSceneEntity = new Entity();
  const sceneSystem = new SceneSystem();

  const menuSceneComponent = new SceneComponent("menuScene");
  const menuSceneEntity = new Entity();

  loadingSceneEntity.addComponent(loadingSceneComponent);
  menuSceneEntity.addComponent(menuSceneComponent);
  audioEntity.addComponent(audioComponent);

  gameEngine.addEntity(squareEntity);
  gameEngine.addEntity(audioEntity);
  gameEngine.addSystem(canvasResizeSystem);
  gameEngine.addSystem(audioSystem);
  gameEngine.addSystem(new RenderSystem(canvas));

  const buttonClickSystem = new ButtonClickSystem(
    canvas,
    sceneSystem,
    squareEntity,
  );
  gameEngine.addSystem(buttonClickSystem);

  gameEngine.start();
};
