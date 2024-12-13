// Define the cache name
const CACHE_NAME = 'study-app-cache-v1';

// List of assets to cache
const urlsToCache = [
    '/Frontend/HomePage.html',
    '/Frontend/HomePage.css',
    '/Frontend/HomePage.js',
    '/Frontend/Pomodoro.html',
    '/Frontend/Pomodoro.css',
    '/Frontend/Pomodoro.js',
    '/manifest.json'
];

// Install event - caching assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache and caching essential files...');
            return cache.addAll(urlsToCache);
        }).catch(err => console.error('Error caching files during install:', err))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch(err => console.error('Error during cache cleanup:', err))
    );
    return self.clients.claim();
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    // Only intercept API calls for caching
    if (event.request.url.includes('/tasks')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // If we have a cached response, serve it
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise, fetch from the network
                return fetch(event.request).then((networkResponse) => {
                    // Cache the new response
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            }).catch((err) => {
                console.error('Fetch failed, and no cache found:', err);
                throw err; // Rethrow error for debugging
            })
        );
    }
});
