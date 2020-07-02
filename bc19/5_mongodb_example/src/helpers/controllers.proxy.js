exports.createControllerProxy = (controller) => {
  return new Proxy(controller, {
    get: (contr, prop) => {
      return async (req, res, next) => {
        try {
          await contr[prop](req, res, next);
        } catch (err) {
          next(err);
        }
      };
    },
  });
};
