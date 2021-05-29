const { Router } = require("express");
const Joi = require("joi");
const { errorWrapper } = require("../helpers/error-wrapper");
const { validate } = require("../helpers/validate");
const { authService } = require("./auth.service");
const { serializeUsers } = require("../users/users.serializer");

// TODO: generate verification identifier and send email after successful registration +
// TODO: create endpoint, which verifies user by verification identifier +
// TODO: if user signs-in with unverified account, then throw error +

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

const verificationSchema = Joi.object({
  verificationToken: Joi.string().uuid().required(),
});
router.get(
  "/verify",
  validate(verificationSchema, "query"),
  errorWrapper(async (req, res, next) => {
    const { verificationToken } = req.query;
    await authService.verifyEmail(verificationToken);

    res.status(200).send("Your email was successfully verified");
  })
);

exports.authController = router;
