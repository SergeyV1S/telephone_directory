import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { Route, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();

const imageRoute = new Route(
  ({ request, sameOrigin }) => sameOrigin && request.destination === "image",
  new CacheFirst({
    cacheName: "iamges"
  }),
  "GET"
);

registerRoute(imageRoute);

const apiRoute = new Route(
  ({ request }) => request.url.startsWith(process.env.BASE_API_URL || "http://localhost:8000"),
  new NetworkFirst({
    cacheName: "api-get-employers"
  })
);

registerRoute(apiRoute);
