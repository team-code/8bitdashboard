const CACHE_NAME = '8bitdash-v1';
const ASSETS_TO_CACHE = [
  '/html/index.html',
  '/html/favicon.ico',
  '/css/main.css',
  '/js/main.js',
  '/js/vars.js',
  '/js/clock.js',
  '/js/greetings.js',
  '/js/weather.js',
  '/js/search.js',
  '/js/pomodoro.js',
  '/js/notepad.js',
  '/js/touch-gestures.js',
  '/js/settings-modal.js',
  '/js/base2048.js',
  '/js/jscolor.min.js',
  '/font/minecraftfont.woff2'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone response to cache it
        // Skip caching for media files to prevent bottlenecking the storage and network
        const isMedia = event.request.url.match(/\.(webp|gif|mp4|png|jpg|jpeg)$/i) || event.request.url.includes('/img/');
        
        if (response && response.status === 200 && !isMedia) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request);
      })
  );
});
