if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceWorker.js')
    .catch((err) => console.log(`unable to register serviceWorker--> ${err}`))

    if('SyncManager' in window){
        navigator.serviceWorker.ready.then(function (swRegistration) {
            return swRegistration.sync.register('dataSync');
        });
    }
} 
