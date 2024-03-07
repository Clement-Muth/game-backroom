import System from "./system.js";

export default class ButtonClickSystem extends System {
  constructor(canvas, sceneSystem, clickableEntity) {
    super();
    this.canvas = canvas;
    this.sceneSystem = sceneSystem;
    this.clickableEntity = clickableEntity; // Ajouter l'entité carré passée en paramètre
    this.clickableEntityPosition =
      clickableEntity.getComponent("PositionComponent");
    this.clickableEntitySize = clickableEntity.getComponent("SizeComponent");

    this.canvas.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Vérifier si le clic se trouve à l'intérieur du carré
    const squareX = this.clickableEntityPosition.x;
    const squareY = this.clickableEntityPosition.y;
    const squareWidth = this.clickableEntitySize.width;
    const squareHeight = this.clickableEntitySize.height;

    // const squareWidth =
    //   this.clickableEntity.getComponent("SizeComponent").width;
    // const squareHeight =
    //   this.clickableEntity.getComponent("SizeComponent").height;

    if (
      clickX >= squareX &&
      clickX <= squareX + squareWidth &&
      clickY >= squareY &&
      clickY <= squareY + squareHeight
    ) {
      // Le clic a eu lieu sur le carré
      console.log("Clic sur le carré !");
    } else {
      // Le clic n'a pas eu lieu sur le carré
      console.log("Clic en dehors du carré.");
    }

    // const clickX = event.clientX;
    // const clickY = event.clientY;

    // // Vérifier si le clic se trouve à l'intérieur du bouton
    // // Ici, vous devrez implémenter la logique pour vérifier si le clic se trouve à l'intérieur du bouton

    // // Si le clic est à l'intérieur du bouton, changer la scène
    // this.sceneSystem.loadScene("menuScene");
    // // if (clickIsInsideButton) this.sceneSystem.loadScene("menuScene");
  }

  update(entities) {}
}
