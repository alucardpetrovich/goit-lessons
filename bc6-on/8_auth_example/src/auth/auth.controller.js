const { Router } = require("express");
const { validate } = require("../helpers/validate");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { signUpSchema, signInSchema } = require("./auth.schemes");
const { authService } = require("./auth.service");
const { prepareUser } = require("../users/user.serializer");
const { prepareUserWithToken } = require("./auth.serializer");

const router = Router();

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

exports.authController = router;
