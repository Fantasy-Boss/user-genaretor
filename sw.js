const cacheName = 'user-generator-v1';
const staticAssets = [
    'index.html',
    'manifest.webmanifest',
    'assets/style.css',
    'assets/bootstrap.min.css',
    'assets/edit.svg',
    'assets/jquery-3.5.1.min.js',
    'assets/script.js',
    'assets/icon-96.png',
    'assets/icon-512.png'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});


self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
            .filter(key => key !== cacheName)
            .map(key => caches.delete(key))
            );
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request)
        })
    )
});




