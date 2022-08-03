function AutoPlay(){}

AutoPlay.prototype.run=(player)=>{
    if(!player.muted){
        player.muted=true
    }
    player.play()
}

export default AutoPlay