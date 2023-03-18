const Joi = require("joi");
const { isObjectId } = require("../../shared/joi-custom");

exports.createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
    .required(),
});

exports.userIdSchema = Joi.object({
  id: Joi.string().custom(isObjectId).required(),
});
