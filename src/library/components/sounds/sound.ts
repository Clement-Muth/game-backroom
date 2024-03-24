export default class Sound {
  private audio: HTMLAudioElement;

  constructor(src: string) {
    this.audio = new Audio(src);
  }

  play(): void {
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }
}
