const CACHE_NAME = 'ui-cache'; // Update cache name version when assets change
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
    caches.match(event.request).then((cachedResponse) => {
      // Serve from cache OR fallback to fetch if not found in cache
      return (
        cachedResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            // Optionally update the cache with the fetched response
            if (
              event.request.method === 'GET' &&
              networkResponse &&
              networkResponse.status === 200
            ) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
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


if ('serviceWorker' in navigator) {
  // Register the service worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });

  let deferredPrompt;

  // Listen for the "beforeinstallprompt" event for browsers that support it
  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('Detected beforeinstallprompt event');
    event.preventDefault(); // Prevent default prompt
    deferredPrompt = event;

    // Show the custom banner for supported browsers
    showInstallBanner(() => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log('User choice:', choiceResult.outcome);
        deferredPrompt = null; // Clear the prompt
      });
    });
  });

  // Safari fallback: Check for Safari user agent and show manual instructions
  if (
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome') &&
    !navigator.userAgent.includes('CriOS') // Exclude Chrome on iOS
  ) {
    console.log('Safari detected: Showing manual Add to Home Screen instructions');
    showSafariBanner();
  }
}

// Function to show a custom banner for supported browsers
function showInstallBanner(onInstallClick) {
  const banner = document.createElement('div');
  banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 40px);
        max-width: 400px;
        z-index: 1000;
    `;

  banner.innerHTML = `
        <div style="flex: 1; margin-right: 10px;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">Add to Home Screen</p>
            <p style="margin: 0; font-size: 14px; color: gray;">
                Install this app for quick access.
            </p>
        </div>
        <button id="install-btn" style="
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        ">Install</button>
        <button id="close-banner-btn" style="
            background-color: gray;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        ">Close</button>
    `;

  document.body.appendChild(banner);

  // Handle Install button click
  document.getElementById('install-btn')?.addEventListener('click', () => {
    onInstallClick();
    banner.remove();
  });

  // Handle Close button click
  document.getElementById('close-banner-btn')?.addEventListener('click', () => {
    banner.remove();
  });
}

// Function to show a custom banner for Safari
function showSafariBanner() {
  const safariBanner = document.createElement('div');
  safariBanner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 40px);
        max-width: 400px;
        z-index: 1000;
    `;

  safariBanner.innerHTML = `
        <div style="flex: 1; margin-right: 10px;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">Add to Home Screen</p>
            <p style="margin: 0; font-size: 14px; color: gray;">
                Tap the <span style="font-weight: bold;">Share</span> button and select
                <span style="font-weight: bold;">"Add to Home Screen"</span>.
            </p>
        </div>
        <button id="close-safari-banner" style="
            background-color: gray;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        ">Close</button>
    `;

  document.body.appendChild(safariBanner);

  // Handle Close button click
  document.getElementById('close-safari-banner')?.addEventListener('click', () => {
    safariBanner.remove();
  });

  // Auto-hide after 15 seconds
  setTimeout(() => {
    safariBanner.remove();
  }, 15000);
}