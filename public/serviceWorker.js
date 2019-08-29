/* eslint-disable no-restricted-globals */

const STATIC_CACHE = 'STATIC_CACHE_V2';
const DYNAMIC_CACHE = 'DYNAMIC_CACHE_V2';

const staticAssets = [
    '/',
    '/manifest.json',
    '/icons/icon-64.png',
    '/icons/icon-128.png',
    '/icons/icon-256.png',
    '/icons/icon-512.png',
]

self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)));
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE).map(key => caches.delete(key)));
        })
    )
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        fetch(evt.request).then(fetchRes => {
            if (evt.request.url.includes('chrome-extension')) return fetchRes;
            return caches.open(DYNAMIC_CACHE).then(cache => {
                let assetURL = '/' + evt.request.url.split(evt.request.referrer)[1];
                if (staticAssets.includes(assetURL)) return fetchRes;
                cache.put(evt.request.url, fetchRes.clone())
                return fetchRes;
            })
        }).catch(() => caches.match(evt.request).catch((err) => console.log(err)))  // Can introduce a fallback here
    )
})

self.addEventListener('sync', function (event) {
    if (event.tag === 'dataSync') {
        event.waitUntil(
            setTimeout(() => {
                syncData()
            }, 2000)
           );
    }
});

function syncData() {
    if ('indexedDB' in self) {
        let req = indexedDB.open('todos_V1', '1');
        req.onsuccess = (event) => {

            let db = event.target.result,
                transaction1 = db.transaction('todos', 'readwrite'),
                store = transaction1.objectStore('todos'),
                transaction2 = db.transaction('userId', 'readwrite'),
                userStore = transaction2.objectStore('userId'),
                userReq = userStore.get('userId'),
                itemsReq = store.getAll(),
                userId;
                userReq.onsuccess = () => {
                    userId = userReq.result.userId;
                    userStore.clear();
                }
                itemsReq.onsuccess = () => {
                    let domain = 'https://limitless-brushlands-35057.herokuapp.com';
                    if (self.location.hostname === 'localhost') domain = 'http://localhost:5000';
                    let items = itemsReq.result;
                    items.forEach(item => {
                        if (item.type === "ADDED") {
                            fetch(`${domain}/${userId}/addTodo`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    text: item.text,
                                    completed: item.completed,
                                    id: item.id
                                })
                            })
                        } else if (item.type === "UPDATED") {
                            fetch(`${domain}/${userId}/toggleTodo/${item.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                        } else if (item.type === "DELETED") {
                            fetch(`${domain}/${userId}/deleteTodo/${item.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                        } else {
                            // DO NOTHING
                        }
                    });
                    store.clear();
                }
        }
        return 1;
    }
    return 1;
}
/*
 * Network falling back on cache, since dynamic ops are being cached. --> Easy for development --> Can change it, to cache falling on network for some files, for performance purpose
 *
 * While caching dynamically, check is being happened with static assets, to eliminate the duplicate caching
 *
 * And also there is a request going for chrome-extension which is not supported by chrome.put()
 *
 * Can also avoid caching addTodo, deleteTodo methods --> if required, but not focusing on that now.
 *
 */