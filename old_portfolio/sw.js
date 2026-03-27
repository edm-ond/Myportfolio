const CACHE_NAME = 'my-portfolio-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/images/logo.png',
  '/offline.html' // A simple page to show if offline
];

// Install event: caches essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Fetch event: serves cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached file if found
        if (response) {
          return response;
        }
        // Otherwise, try the network
        return fetch(event.request).catch(() => {
          // If both fail (offline), show the offline page
          return caches.match('/offline.html');
        });
      })
  );
});