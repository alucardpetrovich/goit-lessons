const Joi = require("joi");

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(8).required();

exports.signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: emailSchema,
  password: passwordSchema,
});

exports.signInSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
