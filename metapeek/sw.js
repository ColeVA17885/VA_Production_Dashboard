const CACHE = 'metapeek-v2';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  var sameOrigin = url.origin === self.location.origin;

  e.respondWith(
    fetch(req)
      .then(function(response) {
        if (sameOrigin && response && response.ok && response.type === 'basic') {
          var clone = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(req, clone); });
        }
        return response;
      })
      .catch(function() {
        return caches.match(req).then(function(hit) {
          if (hit) return hit;
          // Navigation fallback: return the cached start page so the PWA still opens offline.
          if (req.mode === 'navigate') {
            return caches.match('./') || caches.match('index.html') || Response.error();
          }
          return Response.error();
        });
      })
  );
});
