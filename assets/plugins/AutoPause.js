class AutoPause{
    constructor(){
        this.threshold=0.50
        this.handler=this.handler.bind(this)
        this.handleVisibilityChange=this.handleVisibilityChange.bind(this)
    }

    run(player){
        this.player=player
        console.log(this.player)

        const observer=new IntersectionObserver(this.handler, {threshold: this.threshold})
        observer.observe(this.player.media)

        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    }

    handler(entries){
        let entry=entries[0]
        const isVisible=entry.intersectionRatio>=this.threshold
        if(isVisible){
            this.player.play()
        }else{
            this.player.pause()
        }
    }

    handleVisibilityChange(){
        const visibilityState= document.visibilityState

        if(visibilityState==='visible'){
            this.player.play()
        }else{
            this.player.pause()
        }
        
    }
    
}

export default AutoPause