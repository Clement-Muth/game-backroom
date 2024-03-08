import System from "./system.js";

export default class AudioSystem extends System {
  update = (entities) => {
    for (const entity of entities) {
      const audioComponent = entity.getComponent("AudioComponent");

      if (audioComponent?.audio.paused) {
        document.addEventListener("click", () => {
          audioComponent.audio.play();
        });
      }
    }
  };
}
