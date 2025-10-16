import { Router, createApp } from '../lib/index.js';
import { Home } from './pages/home.page.js';
import { About } from './pages/about.page.js';
import { Counter } from './pages/counter.page.js';

const router = new Router({
  '/': Home,
  '/about': About,
  "/counter": Counter
});

createApp({
  router,
  mount: '#app'
});

