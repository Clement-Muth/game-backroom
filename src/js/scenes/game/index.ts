import {
  Application,
  Container,
  Texture,
  TilingSprite,
} from "../../../library";

enum Key {
  Forward = "KeyW",
  Backward = "KeyS",
  Left = "KeyA",
  Right = "KeyD",
}

enum Orientation {
  North = "top",
  South = "bottom",
  East = "right",
  West = "left",
}

export default class GameScene {
  public view: Container;
  private currentPosition: number;
  private currentOrientation: Orientation;
  private screen: { x: number; y: number };
  private readonly initialPosition: number;

  constructor(width: number, height: number) {
    this.view = new Container();
    this.view.x = 180;
    this.view.y = 240;
    this.screen = { x: width, y: height };
    this.initialPosition = Application.dataEngine.positions.__default;
    this.currentPosition = this.initialPosition;
    this.currentOrientation = Orientation.North;

    this.updateBackground(0);

    document.addEventListener("keypress", (e) => {
      const directionMap = {
        [Key.Forward]: {
          [Orientation.North]: Orientation.North,
          [Orientation.South]: Orientation.South,
          [Orientation.East]: Orientation.East,
          [Orientation.West]: Orientation.West,
        },
        [Key.Backward]: {
          [Orientation.North]: Orientation.South,
          [Orientation.South]: Orientation.North,
          [Orientation.East]: Orientation.West,
          [Orientation.West]: Orientation.East,
        },
        [Key.Left]: {
          [Orientation.North]: Orientation.West,
          [Orientation.West]: Orientation.South,
          [Orientation.South]: Orientation.East,
          [Orientation.East]: Orientation.North,
        },
        [Key.Right]: {
          [Orientation.North]: Orientation.East,
          [Orientation.East]: Orientation.South,
          [Orientation.South]: Orientation.West,
          [Orientation.West]: Orientation.North,
        },
      };

      const newPosition = this.getNextPosition(e.code as Key);

      if (newPosition !== undefined) {
        this.currentOrientation =
          directionMap[e.code as Key][this.currentOrientation];
        this.updateBackground(newPosition);
      }
    });
  }

  private updateBackground(id: number) {
    const newTexture = Texture.from(`map${id}`);
    const background = new TilingSprite({
      texture: newTexture,
      width: this.screen.x,
      height: this.screen.y,
    });

    this.view.addChild(background);
    // TODO – Remove child after changing view
    // this.view.removeChildren();
  }

  private getNextPosition(direction: Key): number | undefined {
    const map = Application.dataEngine.map as {
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    }[][];
    const width = map[0].length;
    const height = map.length;
    let x = this.currentPosition % width;
    let y = Math.floor(this.currentPosition / width);
    let cell = map[y][x];

    switch (direction) {
      case Key.Forward: {
        const orientationChanges = {
          [Orientation.East]: { x: 1, y: 0 },
          [Orientation.West]: { x: -1, y: 0 },
          [Orientation.North]: { x: 0, y: -1 },
          [Orientation.South]: { x: 0, y: 1 },
        };

        x += orientationChanges[this.currentOrientation].x;
        y += orientationChanges[this.currentOrientation].y;

        if (
          x < 0 ||
          x >= width ||
          y < 0 ||
          y >= height ||
          !Object.keys(map[y][x]).length
        )
          return undefined;

        cell = map[y][x];
        this.currentPosition = y * width + x;

        return this.currentOrientation === Orientation.North
          ? cell?.top
          : this.currentOrientation === Orientation.South
            ? cell?.bottom
            : this.currentOrientation === Orientation.East
              ? cell?.right
              : cell?.left;
      }

      case Key.Backward: {
        if (this.currentOrientation === Orientation.North) return cell?.bottom;
        if (this.currentOrientation === Orientation.East) return cell?.left;
        if (this.currentOrientation === Orientation.South) return cell?.top;

        return cell?.right;
      }
      case Key.Left: {
        if (this.currentOrientation === Orientation.North) return cell?.left;
        if (this.currentOrientation === Orientation.East) return cell?.top;
        if (this.currentOrientation === Orientation.South) return cell?.right;

        return cell?.bottom;
      }
      case Key.Right: {
        if (this.currentOrientation === Orientation.North) return cell?.right;
        if (this.currentOrientation === Orientation.East) return cell?.bottom;
        if (this.currentOrientation === Orientation.South) return cell?.left;

        return cell?.top;
      }
    }
  }
}
