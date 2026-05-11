const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/67a967c567e1aa3c1430a1f4d9aa404b.loader.js",
    "Build/1dc4aab169deffef1d0cbf49bdae8e20.framework.js.unityweb",
    "Build/bdaf882377232f28f78eaa972d70810d.data.unityweb",
    "Build/6e368ae083de9e16ff6c98e5ea3d7a2a.wasm.unityweb",
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
