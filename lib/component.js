import { reactive } from "./reactive.js";

export class Component {
  constructor(root, state = {}, components = {}, eventBus = null) {
    this.root = root;
    this.state = reactive(state, (key, value) => this.update(key, value));
    this.template = this.template.bind(this);
    this.components = components;
    this.eventBus = eventBus;
    this.eventListeners = new Map();
    this.computed = this.setupComputed();
    this._hasMounted = false;

    // Initial render
    this.update();

    if (this.eventBus && typeof this.eventBus.on === 'function') {
      this.eventBus.on('route:change', this.handleRouteChange.bind(this));
    }
  }

  handleRouteChange({ path, params, query }) {
    if (this.onRouteChange) {
      this.onRouteChange({ path, params, query });
    }
  }

  setupComputed() {
    const computed = {};
    if (this.computedProperties) {
      Object.keys(this.computedProperties).forEach(key => {
        Object.defineProperty(computed, key, {
          get: () => this.computedProperties[key].call(this),
          enumerable: true,
          configurable: true
        });
      });
    }
    return computed;
  }

  update(changedKey = null) {
    if (!this.template || !this.root) return;

    try {
      if (!changedKey) {
        // Full re-render
        let html = this.template(this.state);
        html = this.processTemplate(html);
        this.root.innerHTML = html;
        this.bindEvents();
        this.mountChildComponents();
      } else {
        // Targeted update for specific data-bind elements
        const nodes = this.root.querySelectorAll(`[data-bind="${changedKey}"]`);
        nodes.forEach(node => {
          node.textContent = this.state[changedKey] ?? '';
        });
      }

      this.bindInputs();
      this.handleDirectives();

      // Lifecycle hooks
      if (this.mounted && !this._hasMounted) {
        this._hasMounted = true;
        this.mounted();
      }

      if (this.eventBus && typeof this.eventBus.emit === 'function') {
        this.eventBus.emit('component:updated', { component: this.constructor.name });
      }
    } catch (err) {
      console.error(`Render error: ${err.message}`);
      this.root.innerHTML = `<div style="color: red;">Render error: ${err.message}</div>`;
      if (this.eventBus && typeof this.eventBus.emit === 'function') {
        this.eventBus.emit('error:render', { error: err.message });
      }
    }
  }

  processTemplate(html) {
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
      const value = this.computed[key] !== undefined ? this.computed[key] : 
                   this.state[key] !== undefined ? this.state[key] : '';
      return String(value);
    });
  }

  bindInputs() {
    const inputs = this.root.querySelectorAll('input[data-model], textarea[data-model], select[data-model]');
    inputs.forEach(input => {
      const key = input.dataset.model;
      
      // Remove existing listener
      const existing = this.eventListeners.get(input);
      if (existing) {
        input.removeEventListener(existing.event, existing.handler);
      }

      const handler = (e) => {
        this.state[key] = e.target.value;
        if (this.eventBus && typeof this.eventBus.emit === 'function') {
          this.eventBus.emit('state:changed', { key, value: e.target.value });
        }
      };
      
      input.addEventListener('input', handler);
      this.eventListeners.set(input, { event: 'input', handler });
      input.value = this.state[key] ?? '';
    });
  }

  handleDirectives() {
    const elements = this.root.querySelectorAll('[v-if], [v-show], [data-bind-style]');
    elements.forEach(el => {
      if (el.hasAttribute('v-if')) {
        const condition = this.evaluateExpression(el.getAttribute('v-if'));
        if (condition) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      }
      if (el.hasAttribute('v-show')) {
        const condition = this.evaluateExpression(el.getAttribute('v-show'));
        el.style.display = condition ? '' : 'none';
      }
      if (el.hasAttribute('data-bind-style')) {
        const styleExpr = el.getAttribute('data-bind-style');
        try {
          const styleObj = this.evaluateExpression(styleExpr);
          Object.entries(styleObj).forEach(([k, v]) => (el.style[k] = v));
        } catch (err) {
          console.warn(`Style binding error: ${err.message}`);
        }
      }
    });
  }

  evaluateExpression(expr) {
    try {
      // FIXED: Properly access state and computed properties
      const fn = new Function('state', 'computed', `
        try {
          // Access properties through state and computed objects
          return (${expr
            .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (match) => {
              // Check if it's a property of state or computed
              if (match in state) {
                return `state.${match}`;
              } else if (match in computed) {
                return `computed.${match}`;
              }
              return match;
            })
          });
        } catch(e) {
          console.error('Expression error:', e, 'for expression:', ${JSON.stringify(expr)});
          return false;
        }
      `);
      return fn(this.state, this.computed);
    } catch (err) {
      console.warn(`Expression evaluation error: ${expr}`, err);
      return false;
    }
  }

  bindEvents() {
    // Clear existing listeners
    this.eventListeners.forEach(({ event, handler }, element) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners.clear();

    const elements = this.root.querySelectorAll('*');
    elements.forEach(el => {
      [...el.attributes].forEach(attr => {
        if (attr.name.startsWith('@')) {
          const event = attr.name.slice(1);
          const methodName = attr.value.split('(')[0].trim();
          const method = this[methodName];
          
          if (typeof method === 'function') {
            const handler = (e) => {
              const paramMatch = attr.value.match(/\((.*)\)/);
              if (paramMatch) {
                try {
                  const params = new Function(`return [${paramMatch[1]}]`)();
                  method.call(this, e, ...params);
                } catch (err) {
                  method.call(this, e);
                }
              } else {
                method.call(this, e);
              }
            };
            
            el.addEventListener(event, handler);
            this.eventListeners.set(el, { event, handler });
          }
        }
      });
    });
  }

  mountChildComponents() {
    const elements = this.root.querySelectorAll('[data-component]');
    elements.forEach(el => {
      const name = el.dataset.component;
      const CompClass = this.components[name];
      if (!CompClass) {
        console.warn(`Component '${name}' not found`);
        return;
      }

      const props = {};
      Object.keys(el.dataset).forEach(k => {
        if (k !== 'component') {
          try {
            props[k] = JSON.parse(el.dataset[k]);
          } catch {
            props[k] = el.dataset[k];
          }
        }
      });

      try {
        new CompClass(el, props, this.components, this.eventBus);
      } catch (err) {
        console.error(`Error mounting component '${name}': ${err.message}`);
      }
    });
  }

  destroy() {
    this.eventListeners.forEach(({ event, handler }, element) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners.clear();
    this.root.innerHTML = '';
    
    if (this.eventBus && typeof this.eventBus.emit === 'function') {
      this.eventBus.emit('component:destroyed', { component: this.constructor.name });
    }
    if (this.unmounted) this.unmounted();
  }

  // Default template - should be overridden by subclasses
  template(state) {
    return '<div>Component template not implemented</div>';
  }
}