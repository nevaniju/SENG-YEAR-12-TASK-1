const CACHE_NAME = 'tasknest-cache-v1';
const urlsToCache = [
    'HomePage.html',
    'HomePage.css',
    'HomePage.js',
    'Pomodoro.html',
    'Pomodoro.css',
    'Pomodoro.js'
];

// Install event - Caching assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - Serve cached content or fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache
            }

            // Attempt network fetch if not cached
            return fetch(event.request).catch(() => {
                // Fallback to homepage for navigation requests if offline
                if (event.request.mode === 'navigate') {
                    return caches.match('/HomePage.html');
                }
            });
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});