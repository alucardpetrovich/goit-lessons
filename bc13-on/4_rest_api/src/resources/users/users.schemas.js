const Joi = require("joi");

exports.createUserSchema = Joi.object({
  username: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});
