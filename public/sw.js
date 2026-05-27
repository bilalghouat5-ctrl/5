const CACHE_NAME = 'driverent-v6-7-11-agency-message-icon-ready';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/icon-maskable-192x192.png',
  '/icon-maskable-512x512.png',
  '/logo-source.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS)).catch(() => null));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (url.hostname.includes('supabase.co') || url.hostname.includes('googleapis.com')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('/index.html', clone)).catch(() => null);
          return response;
        })
        .catch(() => caches.match('/index.html').then(r => r || caches.match('/offline.html')))
    );
    return;
  }

  if (['style', 'script', 'worker'].includes(request.destination) || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        try {
          const fresh = await fetch(request);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          return (await cache.match(request)) || Response.error();
        }
      })
    );
    return;
  }

  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response && response.status === 200) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())).catch(() => null);
        return response;
      }).catch(() => caches.match('/icon-192x192.png')))
    );
  }
});
