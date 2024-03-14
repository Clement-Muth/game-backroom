export default class Position {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  set = ({ x, y }) => {
    this._x = x;
    this._y = y;
  };
}
