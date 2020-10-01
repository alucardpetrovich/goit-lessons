const { Router } = require("express");
const Joi = require("joi");
const { signUp, signIn, verifyEmail } = require("./auth.controller");
const { validate } = require("../helpers/validate");

const router = Router();

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/sign-up", validate(signUpSchema), signUp);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/sign-in", validate(signInSchema), signIn);

router.get('/verify/:verificationToken', verifyEmail)

exports.authRouter = router;
