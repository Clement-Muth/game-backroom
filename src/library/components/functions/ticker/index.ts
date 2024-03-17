type TickerCallback<T = any> = (deltaTime: number) => void;

enum UPDATE_PRIORITY {
  HIGH = 0,
  NORMAL = 5,
  LOW = 10,
}

export default class Ticker {
  autoStart: boolean;
  deltaTime: number;
  lastTime: number;
  started: boolean;

  private listeners: { fn: TickerCallback; context?: any; priority: number }[];

  constructor(autoStart = true) {
    this.autoStart = autoStart;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.started = false;
    this.listeners = [];

    if (autoStart) {
      this.start();
    }
  }

  add<T = any>(
    fn: TickerCallback<T>,
    context?: T,
    priority: number = UPDATE_PRIORITY.NORMAL,
  ): this {
    this.listeners.push({ fn, context, priority });
    this.listeners.sort((a, b) => a.priority - b.priority);
    return this;
  }

  addOnce<T = any>(
    fn: TickerCallback<T>,
    context?: T,
    priority: number = UPDATE_PRIORITY.NORMAL,
  ): this {
    const onceFn: TickerCallback<T> = (deltaTime) => {
      fn(deltaTime);
      this.remove(onceFn, context);
    };
    return this.add(onceFn, context, priority);
  }

  remove<T = any>(fn: TickerCallback<T>, context?: T): this {
    this.listeners = this.listeners.filter(
      (listener) => listener.fn !== fn || listener.context !== context,
    );
    return this;
  }

  start(): void {
    if (!this.started) {
      this.started = true;
      this.lastTime = performance.now();
      requestAnimationFrame(this.update.bind(this));
    }
  }

  stop(): void {
    this.started = false;
  }

  destroy(): void {
    this.stop();
    this.listeners = [];
  }

  get FPS(): number {
    return 1000 / this.deltaTime;
  }

  private update(): void {
    const currentTime = performance.now();
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    for (const listener of this.listeners) {
      listener.fn(this.deltaTime);
    }

    if (this.started) {
      requestAnimationFrame(this.update.bind(this));
    }
  }
}
