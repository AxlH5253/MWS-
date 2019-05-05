const staticAssets = [
    '/index.html',
    '/map.html',
    '/404.html',
    '/penjumlahan.html',
    '/tugas1-mapbox.html',
    '/tugas2-mapbox.html',
    '/tugas-fetch-json1.html',
    '/tugas-fetch-json2.html',
    '/favicon.ico',
    '/css/mystyle.css',
    '/css/mygrid.css',
    '/img/logo.png',
    '/img/foto.jpg',
    '/js/map.js',
    '/js/json-map.js',
    '/js/json-map2.js',
    '/js/registersw.js',
    '/data/peta.json'
];

const version = '0.0.1'
const cacheName = `MwsApp-${version}`

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([])
                .then(() => self.skipWaiting());
        }));
});

self.addEventListener('activate', function (event) {
    function deleteOldCache() {
        return caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                .filter(persistedCacheName => persistedCacheName != cacheName)
                .map(persistedCacheName => {
                    console.log(persistedCacheName)
                    return caches.delete(persistedCacheName)
                })
            )
        )
    }
    event.waitUntil(deleteOldCache())
})

self.addEventListener('fetch', function (event) {
    function getFromCache() {
        return caches.match(event.request.clone())
            .then((response) => {
                if (response) {
                    return response
                }

                return fetch(event.request.clone())
                    .then((response) => {
                        if (!response || response.status !== 200) {
                            return response
                        }

                        const clonnedResponse = response.clone()
                        caches.open(cacheName).then(cache => {
                            cache.put(event.request.clone(), clonnedResponse)
                        })
                        return response
                    })
            })
    }
    event.respondWith(getFromCache())
})