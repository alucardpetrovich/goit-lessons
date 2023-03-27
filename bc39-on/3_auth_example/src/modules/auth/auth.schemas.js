const Joi = require("joi");
const { TWO_FA_TYPES } = require("../../shared/constants");

exports.signUpSchema = Joi.object({
  username: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
    .required(),
});

exports.signInSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  twoFaCode: Joi.number().integer().optional(),
});

exports.refreshTokensSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

exports.send2FaSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(TWO_FA_TYPES))
    .required(),
  phoneNumber: Joi.string().required(),
});
