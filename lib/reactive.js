// core/reactive.js
export function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      onChange(); // notify framework to re-render
      return true;
    }
  });
}