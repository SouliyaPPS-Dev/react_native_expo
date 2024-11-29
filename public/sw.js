const CACHE_NAME = 'ui-cache-v1';
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

// Install: Cache all necessary assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing and caching app shell...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Fetch: Serve cached assets (offline mode)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          // Fallback to cached `index.html` for navigation
          return caches.match('/index.html');
        }
      });
    })
  );
});

// Activate: Remove old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});