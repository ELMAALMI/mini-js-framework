import { Component } from "../../lib/component.js";


export class Counter extends Component {
  constructor(root) {
    super(root, { count: 0 }, s => `
      <div>
        <h1>Count: ${s.count}</h1>
        <button @click="incrementu">+</button>
        <button @click="decrement">-</button>
        <a href="#/about">About</a>
      </div>
    `);
  }

  increment() {
    this.state.count++;
  }

  decrement() {
    this.state.count--;
  }
}