const CACHE_NAME = 'study-app-cache-v1';
const urlsToCache = [
    '/Frontend/HomePage.html',
    '/Frontend/Pomodoro.html',

    '/Frontend/HomePage.css',
    '/Frontend/Pomodoro.css',

    '/Frontend/HomePage.js',
    '/Frontend/Pomodoro.js',

];

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching assets...');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if available, otherwise fetch from network
            return response || fetch(event.request).catch(() => {
                // Fallback to HomePage if the request fails (e.g., offline)
                if (event.request.mode === 'navigate') {
                    return caches.match('/Frontend/HomePage.html');
                }
            });
        })
    );
});

// Activate the service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});