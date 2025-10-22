// app.js
import { createApp, Router } from '../lib/index.js';
import { HomeComponent } from './pages/home.page.js';


const router = new Router({
  '/': HomeComponent
});

const app = createApp({
  router,
  mount: '#app'
});

app.eventBus.on('route:change', ({ path }) => {
  console.log(`Navigated to: ${path}`);
});

app.eventBus.on('custom:event', ({ data }) => {
  console.log(`App received custom event: ${data}`);
});