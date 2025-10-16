# JS Framework

A lightweight, reactive JavaScript framework for building single-page applications with minimal overhead. JS Framework provides a simple yet powerful way to create component-based web applications with reactivity, routing, and template binding.

## Overview

JS Framework is a mini framework that combines the best features of modern JavaScript frameworks into a compact, easy-to-use package. It offers:

- **Reactive State Management**: Automatic UI updates when state changes using JavaScript Proxies
- **Component-Based Architecture**: Reusable components with lifecycle hooks and props
- **Hash-Based Routing**: Simple SPA navigation without server configuration
- **Template Binding**: External HTML templates with data binding syntax
- **Event Directives**: Declarative event handling with `@click`, `@input`, etc.
- **Nested Components**: Automatic mounting of child components

## Getting Started

### Running the Development Server

This framework requires a web server to run (due to ES6 module imports). Use the included Node.js development server:

```bash
# Start the server
node server.js
```

Then open your browser to:

```
http://localhost:3000
```

### Alternative: Using VS Code Live Server

Install the "Live Server" extension in VS Code and click "Go Live" in the bottom right corner.

## How It Works

### 1. **Reactivity System**

The framework uses JavaScript Proxies to create reactive state objects. When any property changes, the component automatically re-renders:

```javascript
export function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      onChange(); // Triggers re-render
      return true;
    },
  });
}
```

### 2. **Component System**

Components extend the base `Component` class and can load external HTML templates. They manage their own state and lifecycle:

```javascript
export class Counter extends Component {
  constructor(root) {
    super(root, { count: 0 }, "./src/pages/counter.page.html");
  }

  increment() {
    this.state.count++; // Automatically updates UI
  }
}
```

### 3. **Template Binding**

Templates support several binding syntaxes:

- **Interpolation**: `{{variableName}}` - Displays state values
- **Event Binding**: `@click="methodName"` - Binds event handlers
- **Style Binding**: `:style="expression"` - Dynamic styles
- **Component Mounting**: `<div data-component="ComponentName"></div>` - Nested components

Example template:

```html
<div>
  <h1>Count: {{count}}</h1>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
</div>
```

### 4. **Routing**

The Router class manages navigation using hash-based URLs:

```javascript
const router = new Router({
  "/": Home,
  "/counter": Counter,
});

createApp({
  router,
  mount: "#app",
});
```

When the hash changes (e.g., `#/counter`), the router automatically loads the corresponding component.

### 5. **Application Lifecycle**

1. **Initialization**: `createApp()` sets up the router and mounts the app
2. **Route Loading**: Router detects hash changes and loads the matching component
3. **Component Creation**: Component constructor initializes state and loads template
4. **Template Rendering**: HTML is fetched, interpolated with state values, and rendered
5. **Event Binding**: Event listeners are attached based on `@` directives
6. **Child Mounting**: Nested components are discovered and instantiated
7. **Reactivity**: State changes trigger automatic re-renders

## Core Architecture

```
estmfm.js     → App initialization and mounting
router.js     → Hash-based routing system
component.js  → Component base class with lifecycle
reactive.js   → Proxy-based reactivity system
```

## Key Features

- **Zero Dependencies**: Pure JavaScript, no external libraries required
- **Lightweight**: Minimal codebase, easy to understand and modify
- **Modern Syntax**: ES6+ features with module imports
- **Flexible**: Can be extended with custom functionality
- **Declarative**: Template-based UI definition with automatic updates
