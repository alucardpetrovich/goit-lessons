const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

class UserValidator {
  constructor() {}

  validateRemoveFilmForUser(req, res, next) {
    const validationRules = Joi.object({
      id: Joi.objectId().required(),
    });

    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  validateUpdateUser(req, res, next) {
    const validationRules = Joi.object({
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    });

    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }
}

module.exports = new UserValidator();
