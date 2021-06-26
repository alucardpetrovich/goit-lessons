const Joi = require('joi');

exports.createUserSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),  
});

exports.updateUserSchema = Joi.object({
  username: Joi.string().min(4),
  email: Joi.string().email(),
}).min(1);
