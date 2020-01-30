const Validator = require('node-validator');
const { ValidationError } = require('./errors.helper');

class ValidatorHelper {
  get createValidationMiddleware() {
    return this._createValidationMiddleware.bind(this);
  }

  async _run(validatorObj, objToValidate) {
    return new Promise((res, rej) => {
      Validator.run(validatorObj, objToValidate, (errCount, errors) => {
        if (!errCount) {
          return res(objToValidate);
        }

        rej(new ValidationError(JSON.stringify(errors)));
      });
    });
  }

  _createValidationMiddleware(validatorObj, target) {
    return async (req, res, next) => {
      try {
        req[target] = await this._run(validatorObj, req[target]);
        next();
      } catch(err) {
        next(err);
      }
    };
  }
}

module.exports = new ValidatorHelper();
