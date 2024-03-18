export default class Assets {
  private textures: Map<string, string> = new Map();
  private loadingPromise: Promise<void> | null = null;

  private constructor() {}

  private static getInstance(): Assets {
    if (!Assets.instance) {
      Assets.instance = new Assets();
    }
    return Assets.instance;
  }

  public static load = async (
    urls: { alias: string; src: string }[],
  ): Promise<void> => {
    const assets = this.getInstance();

    if (assets.loadingPromise) await assets.loadingPromise;

    assets.loadingPromise = new Promise((resolve) => {
      for (const url of urls) {
        fetch(url.src)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const dataURL = reader.result;
              assets.textures.set(url.alias, dataURL as string);
              if (assets.textures.size === urls.length) resolve();
            };
          })
          .catch((error) => console.error("Error loading texture:", error));
      }
    });

    await assets.loadingPromise;
  };

  public static getAsset(alias: string): string | undefined {
    const assets = Assets.getInstance();

    return assets.textures.get(alias);
  }

  private static instance: Assets;
}
