const Joi = require("joi");
const { objectId } = require("../../shared/validators/object-id");

exports.createUserSchema = Joi.object({
  username: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

exports.idSchema = Joi.object({
  id: Joi.string().custom(objectId),
});

exports.updateUserSchema = Joi.object({
  username: Joi.string().required(),
});
