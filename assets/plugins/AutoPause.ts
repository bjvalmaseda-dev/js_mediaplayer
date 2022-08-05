import MediaPlayer from "./../MediaPlayer.js";

class AutoPause {
  private threshold: number;
  private player: MediaPlayer;

  constructor() {
    this.threshold = 0.5;
    this.handleIntersectionObserver =
      this.handleIntersectionObserver.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player) {
    this.player = player;
    console.log(this.player);

    const observer = new IntersectionObserver(this.handleIntersectionObserver, {
      threshold: this.threshold,
    });
    observer.observe(this.player.media);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  private handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
    let entry = entries[0];

    const isVisible = entry.intersectionRatio >= this.threshold;
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  private handleVisibilityChange() {
    const visibilityState = document.visibilityState;

    if (visibilityState === "visible") {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}

export default AutoPause;
