import { reactive } from "./reactive.js";

export class Component {
  constructor(root, state, components, eventBus) {
    this.root = root;
    this.state = reactive(state, () => this.update());
    this.update(); // Initial render
  }
  
  template(state) {
    return '<div>Override me!</div>';
  }
  
  update() {
    this.root.innerHTML = this.template(this.state);
  }
}