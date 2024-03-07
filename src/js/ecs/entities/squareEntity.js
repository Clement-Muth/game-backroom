import RenderComponent from "../components/renderComponent.js";
import Entity from "./entity.js";

export default class SquareEntity extends Entity {
  constructor(x, y, color, width, height) {
    super();
    this.addComponent(new RenderComponent(color, width, height));
    this.x = x;
    this.y = y;
  }
}
