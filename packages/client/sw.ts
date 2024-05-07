self.addEventListener('install', (event) => {
  console.log('Service Worker install', event);
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activate', event);
});
