exports.createControllerProxy = controller => {
  return new Proxy(controller, {
    get: (target, name) => {
      if (typeof target[name] !== "function") {
        return target[name];
      }

      return async (req, res, next) => {
        try {
          await target[name].call(target, req, res, next);
        } catch (err) {
          next(err);
        }
      };
    }
  });
};
