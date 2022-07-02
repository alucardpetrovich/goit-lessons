const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

exports.createUserSchema = Joi.object({
  username: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.updateUserSchema = Joi.object({
  username: Joi.string().required(),
});

exports.objectIdSchema = Joi.object({
  id: Joi.string().required().custom(validateObjectId),
});

function validateObjectId(value, helper) {
  if (!isValidObjectId(value)) {
    return helper.message("Please provide valid object ID");
  }

  return value;
}
