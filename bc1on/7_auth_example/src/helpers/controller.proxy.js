exports.createControllerProxy = (controller) => {
  return new Proxy(controller, {
    get: (target, prop) => {
      if (typeof target[prop] !== 'function') {
        return target[prop];
      }

      return async (req, res, next) => {
        try {
          await target[prop](req, res, next);
        } catch(err) {
          next(err);
        }
      }
    }
  });
};
