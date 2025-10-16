// core/component.js
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
    this.bindEvents();
    this.mounted && this.mounted();
  }

  bindEvents() {
    const elements = this.root.querySelectorAll("*");
    elements.forEach(el => {
      [...el.attributes].forEach(attr => {
        if (attr.name.startsWith("@")) {
          const eventName = attr.name.slice(1); 
          const methodName = attr.value.trim(); 
          if (typeof this[methodName] === "function") {
            el.addEventListener(eventName, this[methodName].bind(this));
          } else {
            console.error(`⚠️ Method '${methodName}' not found in component`);
          }
        }
      });
    });
  }
}
