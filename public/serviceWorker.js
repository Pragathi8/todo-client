/* eslint-disable no-restricted-globals */

const STATIC_CACHE = 'STATIC_CACHE';
const DYNAMIC_CACHE = 'DYNAMIC_CACHE';

const staticAssets = [
    '/',
    '/app.js',
    '/manifest.json',
    '/icons/icon-64.png',
    '/icons/icon-128.png',
    '/icons/icon-256.png',
    '/icons/icon-512.png',
]

self.addEventListener('install', evt => {
    console.log(`install event`);
    evt.waitUntil(caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)));
    
})

self.addEventListener('activate', () => {
    
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => cacheRes || fetch(evt.request).then(fetchRes => {
            if(evt.request.url.includes('chrome-extension')) return fetchRes;
            return caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(evt.request.url, fetchRes.clone())
                return fetchRes;
            })
        }))
    )
})