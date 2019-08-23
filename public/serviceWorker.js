/* eslint-disable no-restricted-globals */

const STATIC_CACHE = 'STATIC_CACHE';
const DYNAMIC_CACHE = 'DYNAMIC_CACHE';

self.addEventListener('install', () => {
    console.log(`Service Worker Installed`);
})

self.addEventListener('activate', () => {
    console.log(`Service Worker Activated`);
})

self.addEventListener('fetch', evt => {
    console.log(evt.req)
})