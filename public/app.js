if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceWorker.js')
    .then((reg) => console.log(`Service Worker Registered ${reg}`))
    .catch((err) => console.log(`unable to register serviceWorker--> ${err}`))
} 
