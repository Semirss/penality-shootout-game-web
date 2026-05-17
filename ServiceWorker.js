const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/e021caee000b525017e265565600b691.loader.js",
    "Build/7dd3f3d120db43d6fc8fbd844c709cf3.framework.js.unityweb",
    "Build/93ddea961d9b36481a4dded0b67e52b3.data.unityweb",
    "Build/97a9ede7ba6b4e7175ac8307cf1c9eac.wasm.unityweb",
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
