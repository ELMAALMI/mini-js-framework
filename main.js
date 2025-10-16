import { Component, Router, createApp } from './lib/index.js';

class Home extends Component {
  constructor(root) {
    super(root, { count: 0 }, s => `
      <div class="page">
        <h1>Count: ${s.count}</h1>
        <button id="inc">+</button>
        <a href="#/about">About</a>
      </div>
    `);
  }
  mounted() {
    document.querySelector('#inc').onclick = () => this.state.count++;
  }
}

class About extends Component {
  constructor(root) {
    super(root, {}, () => `
      <div class="page">
        <h2>About MiniView</h2>
        <p>This app shows how DOM, state, and routing work.</p>
        <a href="#/">Home</a>
      </div>
    `);
  }
}

const router = new Router({
  '/': Home,
  '/about': About,
});

createApp({
  router,
  mount: '#app'
});

