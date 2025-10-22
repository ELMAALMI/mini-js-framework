import { EventBus } from "./evt-bus.js";

export function createApp({ router, mount }) {
  console.log('createApp called with:', { router, mount });
  
  if (!mount) throw new Error("createApp requires a mount selector (e.g., '#app')");
  if (!router) throw new Error("createApp requires a router instance");

  const rootEl = document.querySelector(mount);
  console.log('Root element:', rootEl);
  if (!rootEl) throw new Error(`Mount element '${mount}' not found.`);

  // Create a shared EventBus instance
  const eventBus = new EventBus();
  console.log('EventBus created:', eventBus);
  console.log('EventBus methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(eventBus)));

  try {
    console.log('Mounting router...');
    router.mountTo(rootEl, eventBus);
    console.log("%c✅ ESTMJS App Mounted", "color: green; font-weight: bold;");
    return { eventBus, router };
  } catch (err) {
    console.error(`App mount error: ${err.message}`, err);
    rootEl.innerHTML = `<div style="color: red;">App failed to mount: ${err.message}</div>`;
    throw err;
  }
}