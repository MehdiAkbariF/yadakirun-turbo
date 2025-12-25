// public/sw.js
const CACHE_NAME = "yadakirun-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // می‌تونی صفحات مهم رو هم اضافه کنی
  // "/offline"  // اگر صفحه آفلاین داری
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // فقط درخواست‌های همان دامنه رو کش کن (برای امنیت)
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          // اگر آفلاین بود و صفحه بود، می‌تونی صفحه آفلاین نشون بدی
          if (event.request.destination === "document") {
            return caches.match("/");
          }
        });
      })
    );
  }
});