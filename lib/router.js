export class Router {
  constructor(routes) {
    this.routes = routes;
    this.root = null;
  }

  mountTo(rootEl) {
    this.root = rootEl;
    window.addEventListener("hashchange", () => this.load());
    this.load();
  }

  load() {
    const path = location.hash.slice(1) || "/";
    const View = this.routes[path];
    this.root.innerHTML = "";

    if (View) new View(this.root);
    else this.root.innerHTML = "<h2>404 - Not Found</h2>";
  }
}
