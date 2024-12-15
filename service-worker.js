const CACHE_NAME = 'sharely-cache-v1';
const urlsToCache = [
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/HomePage.html',
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/HomePage.css',
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/HomePage.js',
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/Pomodoro.css',
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/Pomodoro.html',
    '/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/Pomodoro.js',

];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {

            return response || fetch(event.request).catch(() => caches.match('/SENG YEAR 12 TASK 1/SENG YEAR 12 TASK 1/Frontend/HomePage.html'));
        })
    );
});


self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});