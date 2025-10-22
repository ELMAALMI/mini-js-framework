export function reactive(obj, onChange) {
  // Store already proxied objects to avoid re-proxying
  const proxyCache = new WeakMap();
  
  function createProxy(target, path = '') {
    if (proxyCache.has(target)) {
      return proxyCache.get(target);
    }

    const handlers = {
      set(target, key, value) {
        const fullPath = path ? `${path}.${key}` : key;
        
        // Avoid unnecessary updates if value hasn't changed
        if (target[key] === value) return true;
        
        const oldValue = target[key];
        target[key] = value;
        
        // Notify change with full path for nested objects
        onChange(fullPath, value, oldValue);
        return true;
      },
      get(target, key) {
        const value = target[key];
        // Support for nested reactive objects
        if (typeof value === 'object' && value !== null && !proxyCache.has(value)) {
          const nestedPath = path ? `${path}.${key}` : key;
          proxyCache.set(value, createProxy(value, nestedPath));
        }
        return proxyCache.get(value) || value;
      }
    };
    
    const proxy = new Proxy(target, handlers);
    proxyCache.set(target, proxy);
    return proxy;
  }

  return createProxy(obj);
}