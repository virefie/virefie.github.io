
// Set up a cache name
const cacheName = 'pwa-cache-v1.9';

// Set up a list of files to be cached
const filesToCache = [
  '/',
  'index.min.html',
  'https://virefie.github.io/outre/main.js',
  'https://virefie.github.io/outre/main.min.css'
];



// When the service worker is installed, cache all the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(() => self.skipWaiting())
  );
});

// When a fetch event is triggered, return the cached response if it exists, otherwise fetch the response from the network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});



// When a new service worker is activated, delete any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});
