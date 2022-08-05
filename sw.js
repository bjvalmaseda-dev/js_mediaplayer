const VERSION='v1'

self.addEventListener('install', event=>{
    event.waitUntil(preCache())
})

self.addEventListener('fetch', event=>{ //intercept all fetch petitions
    const request=event.request

    //only get request
    if(request.method!=='GET'){
        return
    }
    event.respondWith(cachedResponse(request))    
    //update cache
    event.waitUntil(updateCache(request))
})

async function preCache(){
    const cache= await caches.open(VERSION)
    return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/MediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/BigBuckBunny.mp4',
    ])
}

async function cachedResponse(request){
    const cache= await caches.open(VERSION)
    const response= await cache.match(request)
    return response || fetch(request) //if we have response return if not we fetch to network
}

async function updateCache(request){
    const cache= await caches.open(VERSION)
    const response= await fetch(request)
    return cache.put(request, response)
}