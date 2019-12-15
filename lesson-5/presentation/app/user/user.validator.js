import Validator from 'node-validator';
import { AbstractValidator } from '../helpers/abstractValidator';

class UserValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get registerUser() {
    return this._registerUser.bind(this);
  }

  async _registerUser(req, res, next) {
    try {
      const createUserRules = Validator.isObject()
        .withRequired('email', Validator.isString({ regex: /@/i }))
        .withRequired('password', Validator.isString())
      ;

      await this._run(createUserRules, req.body);

      return next();

    } catch(err) {
      next(err);
    }
  }
}

export const userValidator = new UserValidator();
