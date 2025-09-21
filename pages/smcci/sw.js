const CACHE_NAME = "gradio-portal-v1";

const PRECACHE_ASSETS = [
  "/", // root (optional, depends on hosting)
  "index.html",
  "assets/background/space.mp4",
  "assets/background/space-fallback.jpg",
  "assets/icons/logo.png",
  "assets/icons/Home.png",
  "assets/GIF/earth.gif",
  "assets/GIF/Mars.gif",
  "assets/data/apps.json"
];

// ✅ Install: Precache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Precaching assets...");
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// ✅ Activate: Clear old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// ✅ Fetch: Cache-first with network fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      if (cachedRes) {
        return cachedRes; // return from cache
      }
      return fetch(event.request)
        .then(res => {
          // clone and store in cache if it's from same-origin
          const resClone = res.clone();
          if (event.request.url.startsWith(self.location.origin)) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, resClone);
            });
          }
          return res;
        })
        .catch(() => {
          // fallback for images/videos if offline
          if (event.request.destination === "image") {
            return caches.match("assets/background/space-fallback.jpg");
          }
        });
    })
  );
});
