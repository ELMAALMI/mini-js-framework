import { reactive } from "./reactive.js";

export class Component {
  constructor(root, state, template) {
    this.root = root;
    this.template = template;
    this.state = reactive(state, () => this.update());
    this.update();
  }
  update() {
    this.root.innerHTML = this.template(this.state);
    this.mounted && this.mounted();
  }
}
