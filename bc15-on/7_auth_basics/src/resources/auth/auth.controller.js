const { Router } = require("express");
const { catchErrors } = require("../../shared/middlewares/catch-errors");
const { validate } = require("../../shared/middlewares/validate");
const { serializeUserResponse } = require("../users/users.serializers");
const { signUpSchema, signInSchema } = require("./auth.schema");
const { authService } = require("./auth.service");
const { serializeSignIn } = require("./auth.serializers");
const { authorizeWithCookies } = require("../../shared/middlewares/authorize");

const router = Router();

router.post(
  "/sign-up",
  validate(signUpSchema),
  catchErrors(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

router.post(
  "/sign-in",
  validate(signInSchema),
  catchErrors(async (req, res, next) => {
    const result = await authService.signIn(req.body);
    res.cookie('token', result.token, { httpOnly: true });
    res.status(201).send(serializeSignIn(result.user, result.token));
  })
);

router.get(
  "/current",
  authorizeWithCookies(),
  catchErrors(async (req, res, next) => {
    const user = await authService.getCurrentUser(req.userId);
    res.status(200).send(serializeUserResponse(user));
  })
);

exports.authController = router;
