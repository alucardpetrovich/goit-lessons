const Validator = require('node-validator');
const { ValidationError } = require('./errors.helper');

class ValidatorHelper {

  async run(validatorObj, objToValidate) {
    return new Promise((res, rej) => {
      Validator.run(validatorObj, objToValidate, (errCount, errors) => {
        if (!errCount) {
          return res(objToValidate);
        }

        rej(new ValidationError(JSON.stringify(errors)));
      });
    });
  }
}

module.exports = new ValidatorHelper();
