const { Router } = require("express");
const Joi = require("joi");
const { errorWrapper } = require("../helpers/error-wrapper");
const { validate } = require("../helpers/validate");
const { authService } = require("./auth.service");
const { serializeUsers } = require("../users/users.serializer");

const router = Router();

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post(
  "/sign-up",
  validate(signUpSchema),
  errorWrapper(async (req, res) => {
    const userParams = req.body;
    const newUser = await authService.signUp(userParams);

    res.status(201).send(serializeUsers(newUser));
  })
);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post(
  "/sign-in",
  validate(signInSchema),
  errorWrapper(async (req, res, next) => {
    const signInParams = req.body;
    const userAndToken = await authService.signIn(signInParams);

    res.status(201).send({
      user: serializeUsers(userAndToken.user),
      token: userAndToken.token,
    });
  })
);

exports.authController = router;
