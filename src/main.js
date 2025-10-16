import { Router, createApp } from '../lib/index.js';
import { Home } from './pages/home.page.js';
import { Counter } from './pages/counter.page.js';

const router = new Router({
  '/': Home,
  "/counter": Counter
});

createApp({
  router,
  mount: '#app'
});

