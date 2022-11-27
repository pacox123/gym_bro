
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  'index.html',
  'offline.html',
  'ejercicios.html',
  'img/offline.png',
  'img/logo.png',
  'img/zancadas.gif',
  'img/step-up.gif',
  'img/Patadasdegluteo.gif',
  'css/bootstrap.min.css',
  'js/bootstrap.js'
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkOnly()
);

/* workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.CacheFirst()
); */
/* workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.CacheOnly()
); */
workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new workbox.strategies.NetworkFirst()
);
//si hay una respuesta que genere error
workbox.routing.setCatchHandler(async context=>{
  console.log(context);
  console.log(context.request);
  if (context.request.destination === 'image') {
      return workbox.precaching.matchPrecache('img/offline.png');
  }
  else if (context.request.destination === 'document') {
      return workbox.precaching.matchPrecache('offline.html');
  }
  return Response.error();
});


/* var cacheName = "appV1";
var contenidoCache = [
  "index.html",
  "historia.html",
  "ejercicios.html",
  "app.js",
  "sw.js",
  "manifest.webmanifest",
  "css/bootstrap.min.css",
  "js/bootstrap.min.js",
  "img/1.PNG",
  "img/2.PNG",
  "img/3.PNG",
  "img/4.PNG",
];
self.addEventListener("install", (e) => {
  console.log("instaldo");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contenidoCache);
    })()
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
}); */


