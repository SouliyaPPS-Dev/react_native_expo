const CACHE_NAME = 'ui-cache-v4'; // Update the cache version when assets change
const ASSETS_TO_CACHE = [
  '/', // Root
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/Icon-192.png',
  '/icons/Icon-512.png',
  '/styles.css', // Add your CSS file
  '/app.js', // Add your JS file
  // Add more assets like images, fonts, etc.
];

// INSTALL: Cache all necessary assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing and caching app shell...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Force the service worker to activate immediately after install
});

// FETCH: Serve cached assets for offline mode, fallback to network if unavailable
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve from cache OR fallback to fetch if not found in cache
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optionally serve fallback cached pages for `document` requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
      );
    })
  );
});

// ACTIVATE: Remove old caches not matching the current CACHE_NAME
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating and cleaning up old caches...');
  event.waitUntil(
    // Get all cache names
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If cache name is not the current one, delete it
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Become available for all clients immediately
});