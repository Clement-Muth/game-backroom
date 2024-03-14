export default class Texture {
  constructor(source) {
    this.source = source;
  }

  static from = (label) => {
    return localStorage.getItem(label);
  };
}
