export function createControllerProxy(target) {
  return new Proxy(target, {
    get: (controller, prop) => {
      if (typeof controller[prop] !== "function") {
        return controller[prop];
      }

      return controller[prop].bind(controller);
    },
  });
}
