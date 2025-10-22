# 🎯 Student Project Plan: Building a JavaScript Framework

## 📋 **Project Overview**

**Goal**: Build a lightweight JavaScript framework (like Vue/React) from scratch
**Name**: ESTMJS (Easy State Management JS)
**Timeline**: 2-3 weeks
**Level**: Intermediate JavaScript

---

## 📚 **Phase 1: Foundation & Planning (Day 1-2)**

### **Step 1: Understand the Problem**

- [ ] Research existing frameworks (Vue, React, Angular)
- [ ] Identify key features we want to implement:
  - Component system
  - Reactive state management
  - Router
  - Event bus
  - Template rendering

### **Step 2: Project Structure Setup**

```
estmjs-project/
├── index.html
├── src/
│   ├── main.js          # Entry point
│   └── pages/
│       ├── home.page.js
│       └── about.page.js
├── lib/                 # Framework code
│   ├── index.js         # Main exports
│   ├── component.js     # Component system
│   ├── router.js        # Routing
│   ├── reactive.js      # Reactive state
│   ├── evt-bus.js       # Event system
│   └── estmfm.js        # App creator
└── docs/               # Documentation
```

### **Step 3: Learning Objectives**

- [ ] Understand JavaScript Classes and Prototypes
- [ ] Learn about Proxy objects for reactivity
- [ ] Study Event-driven architecture
- [ ] Understand Hash-based routing

---

## 🔨 **Phase 2: Core Framework (Day 3-8)**

### **Step 4: Reactive System (Day 3)**

**File**: `reactive.js`

```javascript
// Learning: Proxy objects, getters/setters
export function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      onChange(key, value); // Trigger updates
      return true;
    },
  });
}
```

**Tasks**:

- [ ] Create reactive wrapper function
- [ ] Test with simple object
- [ ] Implement nested object reactivity

### **Step 5: Event Bus (Day 4)**

**File**: `evt-bus.js`

```javascript
// Learning: Observer pattern, Map data structure
export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    // Add event listener
  }

  emit(event, data) {
    // Trigger all listeners
  }
}
```

**Tasks**:

- [ ] Implement basic event system
- [ ] Add unsubscribe functionality
- [ ] Test with multiple events

### **Step 6: Component Base Class (Day 5-6)**

**File**: `component.js`

```javascript
export class Component {
  constructor(root, state, components, eventBus) {
    this.root = root;
    this.state = reactive(state, () => this.update());
    this.update(); // Initial render
  }

  template(state) {
    return "<div>Override me!</div>";
  }

  update() {
    this.root.innerHTML = this.template(this.state);
  }
}
```

**Tasks**:

- [ ] Create base Component class
- [ ] Implement template rendering
- [ ] Add basic lifecycle hooks (mounted, unmounted)

### **Step 7: Router System (Day 7)**

**File**: `router.js`

```javascript
export class Router {
  constructor(routes) {
    this.routes = routes;
  }

  mountTo(root) {
    this.root = root;
    window.addEventListener("hashchange", () => this.load());
    this.load();
  }
}
```

**Tasks**:

- [ ] Implement hash-based routing
- [ ] Handle route parameters
- [ ] Add 404 handling

### **Step 8: App Creator (Day 8)**

**File**: `estmfm.js`

```javascript
export function createApp({ router, mount }) {
  const rootEl = document.querySelector(mount);
  const eventBus = new EventBus();
  router.mountTo(rootEl, eventBus);
  return { eventBus };
}
```

**Tasks**:

- [ ] Create app initialization function
- [ ] Wire up router and event system
- [ ] Export framework modules

---

## 🎨 **Phase 3: Advanced Features (Day 9-12)**

### **Step 9: Template Syntax (Day 9)**

**Features to add**:

- [ ] `{{ mustache }}` expressions
- [ ] `v-if` and `v-show` directives
- [ ] `@click` event handlers
- [ ] `data-model` two-way binding

### **Step 10: Computed Properties (Day 10)**

```javascript
// In component.js
setupComputed() {
  // Create computed properties that auto-update
}
```

### **Step 11: Child Components (Day 11)**

```javascript
// Component nesting
mountChildComponents() {
  // Find and mount child components
}
```

### **Step 12: Error Handling (Day 12)**

- [ ] Add try-catch blocks
- [ ] User-friendly error messages
- [ ] Debug mode

---

## 🚀 **Phase 4: Building the App (Day 13-15)**

### **Step 13: Create Demo Pages**

**File**: `src/pages/home.page.js`

```javascript
export class HomeComponent extends Component {
  constructor(root, props, components, eventBus) {
    super(
      root,
      {
        title: "Home",
        count: 0,
      },
      components,
      eventBus
    );
  }

  template(state) {
    return `
      <div>
        <h1>{{title}}</h1>
        <p>Count: {{count}}</p>
        <button @click="increment">+1</button>
      </div>
    `;
  }

  increment() {
    this.state.count++;
  }
}
```

### **Step 14: Main App File**

**File**: `src/main.js`

```javascript
import { createApp, Router } from "../lib/index.js";
import { HomeComponent } from "./pages/home.page.js";

const router = new Router({
  "/": HomeComponent,
  "/about": AboutComponent,
});

const app = createApp({
  router,
  mount: "#app",
});
```

### **Step 15: HTML Entry Point**

**File**: `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My ESTMJS App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="src/main.js"></script>
  </body>
</html>
```

---

## 🧪 **Phase 5: Testing & Debugging (Day 16-17)**

### **Step 16: Manual Testing**

- [ ] Test routing between pages
- [ ] Verify state reactivity
- [ ] Check event system
- [ ] Test component lifecycle

### **Step 17: Bug Fixing**

- [ ] Fix any console errors
- [ ] Improve error messages
- [ ] Add console logs for debugging

---

## 📖 **Phase 6: Documentation & Polish (Day 18-19)**

### **Step 18: Write Documentation**

- [ ] API documentation
- [ ] Usage examples
- [ ] Setup instructions

### **Step 19: Final Polish**

- [ ] Code cleanup
- [ ] Performance optimizations
- [ ] Add comments

---

## 🎉 **Phase 7: Presentation (Day 20)**

### **Step 20: Showcase Project**

- [ ] Demo the working application
- [ ] Explain the architecture
- [ ] Discuss challenges and solutions
- [ ] Future enhancements

---

## 🛠 **Tools & Technologies**

- **Language**: Vanilla JavaScript (ES6+)
- **Modules**: ES6 Modules
- **Server**: Live Server / VSCode Live Server
- **Version Control**: Git
- **Browser**: Modern browsers with ES6 support

---

## 🎯 **Learning Outcomes**

By completing this project, the student will understand:

✅ **JavaScript Advanced Concepts**: Classes, Proxies, Events
✅ **Framework Architecture**: How frameworks work internally
✅ **Reactive Programming**: State management patterns
✅ **Component-Based Design**: Reusable UI components
✅ **Routing Systems**: Client-side navigation
✅ **Event Systems**: Pub/Sub patterns
✅ **Problem Solving**: Debugging complex systems

---

## 📝 **Assessment Criteria**

- **Code Quality** (30%): Clean, readable, well-commented
- **Functionality** (40%): All features work correctly
- **Architecture** (20%): Good separation of concerns
- **Documentation** (10%): Clear setup and usage instructions

---

## 🆘 **When You Get Stuck**

1. **Console.log Everything**: Debug step by step
2. **Check Browser DevTools**: Network tab, Console, Elements
3. **Simplify**: Break down complex problems
4. **Research**: Look at similar open-source projects
5. **Ask for Help**: Don't stay stuck for more than 30 minutes

Ready to start? Let's begin with **Phase 1, Step 1**! 🚀
