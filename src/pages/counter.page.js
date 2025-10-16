import { Component } from "../../lib/component.js";
import { NavBar } from "../components/navbar.component.js";


export class Counter extends Component {
  constructor(root) {
    super(root, { count: 0 }, "./src/pages/counter.page.html", {
        NavBar: NavBar
    });
  }

  increment() {
    this.state.count++;
  }

  decrement() {
    this.state.count--;
  }
}