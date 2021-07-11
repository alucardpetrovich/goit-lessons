const Joi = require("joi");

exports.signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
