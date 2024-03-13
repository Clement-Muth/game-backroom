// export default class GameEngine {
//   constructor() {
//     this.app = new Application();
//   }

//   init = async () => {
//     await this.app.init({ background: "transparent", resizeTo: document });

//     this.ticker = this.app.ticker;
//     this.app.renderer.resize(window.innerWidth, window.innerHeight);

//     document.body.appendChild(this.app.canvas);

//     await Assets.load([
//       {
//         alias: "background",
//         src: "/public/static/images/menu/menu.jpg",
//       },
//     ]);

//     return this;
//   };

//   addScene = (scene) => {
//     this.app.stage.addChild(scene);
//   };
//   removeScene = () => {
//     this.app.stage.removeChildren();
//   };
// }
