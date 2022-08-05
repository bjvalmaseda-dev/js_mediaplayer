import MediaPlayer from "./MediaPlayer.js"
import AutoPlay from "./plugins/AutoPlay.js";
import AutoPause from "./plugins/AutoPause.js";

const video = document.querySelector("video");
const player = new MediaPlayer(
    { el: video, 
        plugins: [
          new AutoPlay(),
          new AutoPause()
        ] 
});

const button = document.querySelector("button");
const muted= document.getElementById('mutedButton');
button.onclick = () => player.togglePlay();
muted.onclick=()=>player.toggleMute();

if('serviceWorker' in navigator){
  navigator.serviceWorker.register(new URL('/sw.js', import.meta.url)).catch(err=>{
    console.log(err.message)
  })
}