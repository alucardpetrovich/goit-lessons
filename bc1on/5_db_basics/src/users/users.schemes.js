const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
});

exports.validateIdSchema = Joi.object({
  id: Joi.objectId(),
});
