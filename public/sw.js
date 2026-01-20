const cacheName = "Foodie-v1";

const filesToCache = [
  "./",
  "./login.html",
  "./order.html",
  "./signup.html",
  "./payment.html",
  "./about.html",
  "./contact.html",
  "./fastfood.html",
  "./fastrestaurant.html",
  "./homepage.html",
  "./last.html",
  "./nonveg.html",
  "./nonvegrestaurant.html",
  "./service.html",
  "./vegfood.html",
  "./vegrestaurant.html",
  "./style.css",
  "./homestyle.css",
  "./order.css",
  "./index.js",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log("Caching files");
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});


