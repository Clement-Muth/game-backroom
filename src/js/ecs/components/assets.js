export default class Assets {
  constructor(src) {
    this.src = src;
  }

  static load = async (urls) => {
    for (const url of urls) {
      try {
        if (localStorage.getItem(url.alias)) continue;
        const response = await fetch(url.src);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const dataURL = reader.result;
          localStorage.setItem(url.alias, dataURL);
        };
      } catch (error) {
        console.error(`An error occured ${url.src}:`, error);
      }
    }
  };
}
