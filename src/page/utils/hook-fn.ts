const hooks = new Map<any, Map<any, any[]>>();

export function hookFn<T, K extends keyof T>(obj: T, key: K, fn: T[K]) {
  const aux = obj[key] as any;
  let objHooks = hooks.get(obj)!;
  if (!objHooks) hooks.set(obj, (objHooks = new Map<any, any>()));
  let fns = objHooks.get(key)!;
  if (!fns) {
    objHooks.set(key, (fns = []));
    obj[key] = function (this: any, ...args: any) {
      fns.forEach((fn) => fn.apply(this, args));
      aux.apply(this, args);
    } as T[K];
  }
  fns.push(fn);
  return () => {
    const index = fns.indexOf(obj);
    fns.splice(index, 1);
    if (fns.length === 0) {
      objHooks.delete(key);
    }
  };
}
