import Validator from 'node-validator';
import { AbstractValidator } from "../helpers/abstractValidator";

class SessionValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get signIn() {
    return this._signIn.bind(this);
  }

  async _signIn(req, res, next) {
    const signInRules = Validator.isObject()
      .withRequired('email', Validator.isString())
      .withRequired('password', Validator.isString())
    ;

    await this._run(signInRules, req.body);

    return next();
  }
}

export const sessionValidator = new SessionValidator();
