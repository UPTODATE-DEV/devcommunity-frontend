// open pwa on notification click
self.addEventListener("notificationclick", (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("/notifications");
      }
    })
  );
});

export default null;
declare var self: ServiceWorkerGlobalScope;
