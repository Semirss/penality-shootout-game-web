const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/f8431d7c1a241678628151b0fa9b4bef.loader.js",
    "Build/7dd3f3d120db43d6fc8fbd844c709cf3.framework.js.unityweb",
    "Build/75009adae08c7c6fd024b4c95817169f.data.unityweb",
    "Build/11e8e4ebbaf676a7a48f4c55834fa5f6.wasm.unityweb",
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
