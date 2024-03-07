import Component from "../components/component.js";

export default class RenderComponent extends Component {
  constructor(color, width, height) {
    super();
    this.color = color;
    this.width = width;
    this.height = height;
  }
}
