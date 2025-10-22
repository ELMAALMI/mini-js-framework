import { EventBus } from "./evt-bus.js";

export function createApp({ router, mount }) {
  const rootEl = document.querySelector(mount);
  const eventBus = new EventBus();
  router.mountTo(rootEl, eventBus);
  return { eventBus };
}