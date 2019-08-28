import uuid from 'uuid';

const storeName = 'todos';

const openDatabase = () => {
    if ('indexedDB' in window) {
        let req = indexedDB.open('todos_V1', '1');

        req.onupgradeneeded = function (event) {
            console.log(' In upgrade event');
            let upgradeDb = event.target.result;
            if (!upgradeDb.objectStoreNames.contains(storeName))
                upgradeDb.createObjectStore(storeName, { keyPath: 'id', });
            if (!upgradeDb.objectStoreNames.contains('userId')) 
                upgradeDb.createObjectStore('userId', { keyPath: 'id', });
            let transaction = event.target.transaction,
                userStore = transaction.objectStore('userId');
                let userReq = userStore.add({
                    id: 'userId',
                    userId: localStorage.getItem('userId')
                })
            userReq.onerror = (err) => console.log(err);
            upgradeDb.close();
            }
            return req;
        }
    }

openDatabase();

export let addData = (task) => {
    let req = openDatabase();
    return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
            let db = event.target.result,
                transaction = db.transaction('todos', 'readwrite'),
                store = transaction.objectStore('todos'),
                item = {
                    id: uuid.v4(),
                    text: task,
                    completed: false,
                    type: "ADDED"
                };
            store.add(item);
            db.close();
            resolve({
                transaction,
                item
            })
        }
    })
}

export let putData = (id) => {
    let req = openDatabase();
    return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
            let db = event.target.result,
                transaction = db.transaction('todos', 'readwrite'),
                store = transaction.objectStore('todos'),
                itemReq = store.get(id);
            itemReq.onsuccess = () => {
                if (itemReq.result === undefined) {
                    store.add({
                        id: id,
                        completed: true,
                        type: "UPDATED"
                    })
                } else {
                    store.put({
                        id: id,
                        text: itemReq.result.text,
                        type: "UPDATED",
                        completed: !itemReq.result.completed
                    });
                }
                db.close();
            }
            resolve(transaction);
        }
    })
}

export let deleteData = (id) => {
    let req = openDatabase();
    return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
            let db = event.target.result,
                transaction = db.transaction('todos', 'readwrite'),
                store = transaction.objectStore('todos');
            store.delete(id);
            store.add({
                id: id,
                type: "DELETED"
            })
            db.close();
            resolve(transaction);
        }
    })
}

/*
 * Toggling while offline, already completed item --> might show reverse behavior when back online
 *
 * Adding, Updating and Deleting --> No problem in UI, since redux store is being updated.
 *
 * Background sync should be done!
 *
 */