if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceWorker.js')
    .catch((err) => console.log(`unable to register serviceWorker--> ${err}`))
} 
