export default class Texture {
  constructor() {}

  static from = (label: string) => {

    const texture = localStorage.getItem(label);

    if (!texture) throw new Error(`Texture does not exist: ${label}`);

    return texture;
  };
}
