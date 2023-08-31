const hooks = new Map<any, Map<any, any[]>>();

export function hookFn<T, K extends keyof T, V = T[K] extends (...args: Parameters<(...args: any) => any>) => void ? T[K] : unknown>(
  obj: T,
  key: K,
  fn: V,
) {
  const aux = obj[key] as any;
  let objHooks = hooks.get(obj)!;
  if (!objHooks) hooks.set(obj, (objHooks = new Map<any, any>()));
  let fns = objHooks.get(key)!;
  if (!fns) {
    objHooks.set(key, (fns = []));
    obj[key] = function (this: any, ...args: any) {
      try {
        fns.forEach((fn) => fn.apply(this, args));
      } catch (exc) {
        console.log("HookFn failed for", obj, key, fn, String(fn));
      }
      return aux.apply(this, args);
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
