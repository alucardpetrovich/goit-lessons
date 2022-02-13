const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

exports.createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.updateUserSchema = Joi.object({
  username: Joi.string().required(),
});

exports.idScheme = Joi.object({
  id: Joi.custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error("invalid MongoDB ObjectID");
    }

    return value;
  }).required(),
});
