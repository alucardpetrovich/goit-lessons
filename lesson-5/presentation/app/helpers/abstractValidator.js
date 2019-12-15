import Validator from 'node-validator';

export class AbstractValidator {
  constructor() {}

  async _run(validatorObj, objToValidate) {
      return new Promise((res, rej) => {
          Validator.run(validatorObj, objToValidate, (errCount, errors) => {
              if ( !errCount ) {
                  return res(objToValidate);
              }

              const validationError = new Error(JSON.stringify(errors));
              validationError.status = 400;

              rej(validationError);
          });
      });
  }

}
