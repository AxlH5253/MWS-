if('serviceWorker' in navigator){
    console.log('SW OK!');
//install SW
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered'))
    .catch((error) => console.log('SW Registration Error',error));

}else{
    console.log('SW Does Not Exist!');
}
