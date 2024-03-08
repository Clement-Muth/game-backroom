import ColorComponent from "../components/colorComponent.js";
import PositionComponent from "../components/positionComponent.js";
import SizeComponent from "../components/sizeComponent.js";
import Entity from "./entity.js";

export default class SquareEntity extends Entity {
  constructor(x, y, width, height, color) {
    super();
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new SizeComponent(width, height));
    this.addComponent(new ColorComponent(color));
  }
}
