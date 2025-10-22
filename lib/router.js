export class Router {
  constructor(routes) {
    this.routes = routes;
    this.root = null;
    this.currentRoute = null;
    this.eventBus = null; // Initialize eventBus
  }

  mountTo(rootEl, eventBus) {
    this.root = rootEl;
    this.eventBus = eventBus; // Store the eventBus instance
    window.addEventListener('hashchange', () => this.load());
    window.addEventListener('popstate', () => this.load());
    this.load();
  }

  load() {
    const path = location.hash.slice(1) || '/';
    const [basePath, queryString] = path.split('?');
    const queryParams = this.parseQuery(queryString);

    const matchedRoute = Object.keys(this.routes).find(route => {
      const regex = new RegExp('^' + route.replace(/:(\w+)/g, '([^/]+)') + '$');
      return regex.test(basePath);
    });

    this.root.innerHTML = '';
    this.currentRoute = matchedRoute || '/';

    const View = this.routes[this.currentRoute];
    if (View) {
      const params = this.extractParams(matchedRoute, basePath);
      
      // Pass eventBus to the component
      new View(this.root, { params, query: queryParams }, {}, this.eventBus);
      
      // Emit route change event
      if (this.eventBus) {
        this.eventBus.emit('route:change', { path: basePath, params, query: queryParams });
      }
    } else {
      this.root.innerHTML = '<h2>404 - Not Found</h2>';
      if (this.eventBus) {
        this.eventBus.emit('route:notfound', { path: basePath });
      }
    }
  }

  parseQuery(queryString) {
    const params = {};
    if (!queryString) return params;
    new URLSearchParams(queryString).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  extractParams(route, path) {
    if (!route) return {};
    const regex = new RegExp('^' + route.replace(/:(\w+)/g, '([^/]+)') + '$');
    const match = path.match(regex);
    if (!match) return {};

    const paramNames = (route.match(/:(\w+)/g) || []).map(name => name.slice(1));
    return paramNames.reduce((params, name, index) => {
      params[name] = match[index + 1];
      return params;
    }, {});
  }

  navigate(path) {
    location.hash = path;
  }
}