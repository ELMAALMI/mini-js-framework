// Learning: Proxy objects, getters/setters
export function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      onChange(key, value); // Trigger updates
      return true;
    }
  });
}