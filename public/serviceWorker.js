/* eslint-disable no-restricted-globals */

const STATIC_CACHE = 'STATIC_CACHE';
const DYNAMIC_CACHE = 'DYNAMIC_CACHE';

const staticAssets = [
    '/app.js',
    '/manifest.json',
    '/icons/icon-64.png',
    '/icons/icon-128.png',
    '/icons/icon-256.png',
    '/icons/icon-512.png',
]

self.addEventListener('install', () => {
    caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets))
})

self.addEventListener('activate', () => {
    
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => cacheRes || fetch(evt.request))
    )
})