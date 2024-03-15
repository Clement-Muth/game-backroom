type URL = {
  alias: string;
  src: string;
}

export default class Assets {
  private src: string;

  constructor(src: string) {
    this.src = src;
  }

  static load = async (urls: URL[]) => {
    for (const url of urls) {
      try {
        if (localStorage.getItem(url.alias)) continue;
        const response = await fetch(url.src);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const dataURL = reader.result;
          localStorage.setItem(url.alias, dataURL as string);
        };
      } catch (error) {
        console.error(`An error occured ${url.src}:`, error);
      }
    }
  };
}
