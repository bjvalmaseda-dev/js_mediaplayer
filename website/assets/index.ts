import MediaPlayer from "@bjvalmaseda/mediaplayer";
import AutoPlay from "@bjvalmaseda/mediaplayer/lib/plugins/AutoPlay";
import AutoPause from "@bjvalmaseda/mediaplayer/lib/plugins/AutoPause";
import Ads from "@bjvalmaseda/mediaplayer/lib/plugins/Ads";

const video = document.querySelector("video");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay(), new AutoPause(), new Ads()],
});

const button: HTMLElement = document.querySelector(
  "#playButton"
) as HTMLElement;
const muted: HTMLElement = document.getElementById(
  "mutedButton"
) as HTMLElement;
button.onclick = () => player.togglePlay();
muted.onclick = () => player.toggleMute();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(new URL("/sw.js", import.meta.url))
    .catch((err) => {
      console.log(err.message);
    });
}
