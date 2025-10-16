import { Component } from "../../lib/component.js";
export class Home extends Component {
  constructor(root) {
    super(root, { count: 0 }, s => `
      <div class="page">
        <h1>Count: ${s.count}</h1>
        <button @click="inc">+</button>
        <a href="#/about">About</a>
        <a href="#/counter">Contact</a>
      </div>
    `);
  }
  inc() {
    this.state.count++;
  }
    mounted() {
    console.log("Home component mounted");
  }
}