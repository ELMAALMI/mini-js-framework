// core/miniview.js
import { Router } from "./router.js";

export function createApp({ router, mount }) {
  if (!mount) throw new Error("createApp requires a mount selector (e.g., '#app')");
  if (!router) throw new Error("createApp requires a router instance");

  // Set a global root (optional)
  const rootEl = document.querySelector(mount);
  if (!rootEl) throw new Error(`Mount element '${mount}' not found.`);

  // Initialize router
  router.mountTo(rootEl);

  console.log("%c✅ ESTMJS App Mounted", "color: green; font-weight: bold;");
}
