const Validator = require("node-validator");
const { createValidationMiddleware } = require("../helpers/validator.helper");

class AuthValidationMiddleware {
  constructor() {}

  get signUpPlain() {
    const signUpPlainRules = Validator.isObject()
      .withRequired("username", Validator.isString())
      .withRequired("email", Validator.isString())
      .withRequired("password", Validator.isString())
      .withOptional("photo_url", Validator.isString());
    return createValidationMiddleware(signUpPlainRules, "body");
  }

  get signInPlain() {
    const signInPlainRules = Validator.isObject()
      .withRequired("email", Validator.isString())
      .withRequired("password", Validator.isString());
    return createValidationMiddleware(signInPlainRules, "body");
  }
}

module.exports = new AuthValidationMiddleware();
