const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createUserSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.updateUserSchema = Joi.object({
  username: Joi.string().min(4),
  email: Joi.string().email(),
}).min(1);

exports.idValidationSchema = Joi.object({
  id: Joi.objectId(),
});
