import Assets from "./assets";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class Texture {
  static from = (alias: string): string => {
    const src = Assets.getAsset(alias);

    if (!src) throw new Error("Texture not found");

    return src;
  };
}
