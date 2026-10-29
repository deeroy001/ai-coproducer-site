// Retires the service worker left by the old AI Co-Producer app (the earlier
// Lovable build of this domain). Browsers that visited it still run that old
// worker, which keeps showing the old app from its offline cache. Browsers
// check this file for updates, so this replacement installs in its place,
// deletes the old caches, unregisters itself and reloads open tabs onto the
// current site. Safe to delete once old visitors have come back (a few months).
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const tabs = await self.clients.matchAll({ type: 'window' });
    for (const tab of tabs) tab.navigate(tab.url);
  })());
});

// Never answer from a cache: always go to the network.
self.addEventListener('fetch', () => {});
