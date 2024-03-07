export default class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.entities = [];
    this.systems = [];
  }

  addEntity = (entity) => this.entities.push(entity);

  addSystem = (system) => this.systems.push(system);

  update() {
    for (const system of this.systems) system.update(this.entities);

    requestAnimationFrame(this.update.bind(this));
  }

  start = () => this.update();
}
