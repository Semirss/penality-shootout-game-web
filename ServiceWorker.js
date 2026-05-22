const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/0b242c670c2598576375b54dc4ea5ef2.loader.js",
    "Build/7dd3f3d120db43d6fc8fbd844c709cf3.framework.js.unityweb",
    "Build/4dc23fda5dbfe7ea36708465d9862412.data.unityweb",
    "Build/a7af7860ba52d3181c0267739cc8cf77.wasm.unityweb",
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
