import Component from "./component.js";

export default class AudioComponent extends Component {
  constructor(audioSrc) {
    super();

    this.audioSrc = audioSrc;
    this.audio = new Audio(audioSrc);
  }
}
