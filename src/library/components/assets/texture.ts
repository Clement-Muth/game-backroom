// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class Texture {
  static from = (label: string) => {
    const texture = localStorage.getItem(label);

    if (!texture) throw new Error(`Texture does not exist: ${label}`);

    return texture;
  };
}
