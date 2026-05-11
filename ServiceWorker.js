const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/71863c27beac9931f2812b573deab43c.loader.js",
    "Build/d19df92390cd54435007c549909b50dc.framework.js.unityweb",
    "Build/4e1eb51e09a06276d99aa8a01a7c8eed.data.unityweb",
    "Build/1835f16a6e4f087cdddd418342f0814f.wasm.unityweb",
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
