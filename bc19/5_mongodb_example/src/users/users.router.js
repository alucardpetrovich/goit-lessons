const { Router } = require("express");
const Joi = require("@hapi/joi");
const { validate } = require("../helpers/validate");
const { createUser } = require("./users.controller");

const router = Router();

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/", validate(createUserSchema), createUser);

exports.usersRouter = router;
