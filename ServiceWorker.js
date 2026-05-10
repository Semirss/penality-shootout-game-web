const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/161afd98609e3d33ca3c6ada5e6ae43f.loader.js",
    "Build/1dc4aab169deffef1d0cbf49bdae8e20.framework.js.unityweb",
    "Build/77c45c3a99c286fe9c178c76fad33f0d.data.unityweb",
    "Build/b36b60e4ad7054c9b4b203c9b68224ac.wasm.unityweb",
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
      
      if (!response) {
          response = await fetch(e.request);
          if (e.request.method === 'GET') {
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
          }
      }
      
      if (e.request.url.match(/\.unityweb$/)) {
          const headers = new Headers(response.headers);
          if (!headers.get('Content-Encoding')) {
              headers.set('Content-Encoding', 'br');
          }
          if (e.request.url.match(/\.wasm\.unityweb$/)) {
              headers.set('Content-Type', 'application/wasm');
          } else if (e.request.url.match(/\.framework\.js\.unityweb$/)) {
              headers.set('Content-Type', 'application/javascript');
          } else {
              headers.set('Content-Type', 'application/octet-stream');
          }
          return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: headers
          });
      }

      return response;
    })());
});
