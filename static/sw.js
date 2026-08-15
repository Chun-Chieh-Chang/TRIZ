/**
 * TRIZ Solver PRO - Progressive Web App (PWA) Service Worker
 * Provides offline capabilities, intelligent asset caching, and lifecycle management.
 */

const CACHE_NAME = 'triz-solver-pwa-v2.1';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './css/style.css?v=2.0',
    './js/ai_service.js',
    './js/engine.js',
    './js/main.js',
    './data/triz_master_db.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-192.png',
    './icons/icon-maskable-512.png'
];

// Installation: Pre-cache core shell & offline knowledge base
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[PWA SW] Pre-caching core offline assets...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((err) => {
                console.warn('[PWA SW] Pre-cache warning:', err);
            })
    );
});

// Activation: Clean up deprecated old cache versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[PWA SW] Removing deprecated cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Strategy: Stale-While-Revalidate for local assets; Network-First for dynamic APIs
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Bypass external AI endpoints (Google AI Studio, Agnes AI, etc.)
    if (url.origin.includes('googleapis.com') || url.origin.includes('agnes-ai.com')) {
        return;
    }

    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Fallback to cached version if offline
                    return cachedResponse;
                });

            // Return cached response immediately if available, otherwise wait for network
            return cachedResponse || fetchPromise;
        })
    );
});
