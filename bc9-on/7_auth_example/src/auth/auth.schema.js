const Joi = require("joi");

exports.signUpSchema = Joi.object({
  displayName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
