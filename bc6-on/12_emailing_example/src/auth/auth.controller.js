const { Router } = require("express");
const { validate } = require("../helpers/validate");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { signUpSchema, signInSchema } = require("./auth.schemes");
const { authService } = require("./auth.service");
const { prepareUser } = require("../users/user.serializer");
const { prepareUserWithToken } = require("./auth.serializer");

const router = Router();

// 1. add verification token & status to user model +
// 2. send email with verification link after registration +
// 3. create endpoint for verification +
// 4. disable sign-in for non-verified users +

router.post(
  "/sign-up",
  validate(signUpSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    return res.status(201).send(prepareUser(user));
  })
);

router.post(
  "/sign-in",
  validate(signInSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.signIn(req.body);
    return res.status(201).send(prepareUserWithToken(userWithToken));
  })
);

router.get(
  "/verify/:verificationToken",
  asyncWrapper(async (req, res, next) => {
    await authService.verifyEmail(req.params.verificationToken);
    return res.status(204).send();
  })
);

exports.authController = router;
