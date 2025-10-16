// core/component.js
import { reactive } from "./reactive.js";

export class Component {
  constructor(root, state = {}, htmlFile = null, components = {}) {
    this.root = root;
    this.state = reactive(state, () => this.update());
    this.template = null;       // Will be set after loading HTML
    this.components = components;

    if (htmlFile) {
      this.loadTemplate(htmlFile); // Automatically load the HTML file
      this.mountChildComponents();
      this.update();
    } else {
      this.template = htmlFile; // Directly use the provided template function
      this.update();
    }
  }

  // Load HTML from external file
  async loadTemplate(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load template: ${url}`);
      const html = await res.text();
      this.template = () => html;
      this.update();
    } catch (err) {
      console.error(err);
    }
  }

  // Render method
  update() {
    if (!this.template) return;
    // Get template HTML
    let html = this.template(this.state);

    // Replace {{stateVar}} placeholders
    html = html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
      return this.state[key] !== undefined ? this.state[key] : '';
    });

    this.root.innerHTML = html;

    this.bindEvents();
    this.mountChildComponents();

      // For reactive updates, replace text nodes only
    Object.keys(this.state).forEach(key => {
      const nodes = this.root.querySelectorAll(`[data-bind="${key}"]`);
      nodes.forEach(n => n.textContent = this.state[key]);
    });

    this.mounted && this.mounted();
}

  // Bind @click / :style directives
  bindEvents() {
    const elements = this.root.querySelectorAll("*");
    elements.forEach(el => {
      [...el.attributes].forEach(attr => {
        if (attr.name.startsWith("@")) {
          const event = attr.name.slice(1);
          const method = this[attr.value];
          if (typeof method === "function") el.addEventListener(event, method.bind(this));
        }

        if (attr.name === ":style") {
          const expr = attr.value;
          try {
            const styleObj = eval(expr);
            Object.entries(styleObj).forEach(([k, v]) => el.style[k] = v);
          } catch (err) {
            console.warn("Style binding error:", err);
          }
        }
      });
    });
  }

  // Auto-mount child components
  mountChildComponents() {
    const all = this.root.querySelectorAll("[data-component]");
    all.forEach(el => {
      const name = el.dataset.component;
      const CompClass = this.components[name];
      if (!CompClass) return console.warn(`Component '${name}' not found`);

      // Collect props from data-*
      const props = {};
      Object.keys(el.dataset).forEach(k => {
        if (k !== "component") props[k] = el.dataset[k];
      });

      new CompClass(el, props);
    });
  }

  template(state) {
    return "";
  }
}
