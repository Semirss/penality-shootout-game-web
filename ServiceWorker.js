const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/429bd6742e418f3b61e17275690abe04.loader.js",
    "Build/7dd3f3d120db43d6fc8fbd844c709cf3.framework.js.unityweb",
    "Build/b12166fff5086f565426a1e4a354fad4.data.unityweb",
    "Build/9f5a537fa05c5468b580ce8dd2e68bc7.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
