import { Text as TextPixi } from "../../../libraries/pixijs.js";

export default class Text extends TextPixi {
  constructor(...props) {
    super(...props);

    this.anchor.set(0, 0.5);
    this.resolution = 8;
    this.fontSize = 32;
    this.position.set(0, -200);
    this.interactive = true;
    this.click = (e) => {
      console.log("do something you want");
      console.log(e);
    };
    this.buttonMode = true;
    this.eventMode = "static";
    this.cursor = "pointer";

    console.log(this);
  }

  onClick = (callback) => {
    this.on("pointerdown", callback);
  };
}
