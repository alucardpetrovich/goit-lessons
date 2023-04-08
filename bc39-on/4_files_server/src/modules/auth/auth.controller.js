const { Router } = require("express");
const { validate } = require("../../shared/middlewares/validation");
const { asyncWrapper } = require("../../shared/middlewares/async-wrapper");
const {
  signUpSchema,
  signInSchema,
  refreshTokensSchema,
  send2FaSchema,
} = require("./auth.schemas");
const { authService } = require("./auth.service");
const { serializeUserResponse } = require("../users/users.serializers");
const {
  serializeSignInResponse,
  serializeRefreshTokensResponse,
} = require("./auth.serializers");
const { authorize } = require("../../shared/middlewares/authorize");

const authController = Router();

authController.post(
  "/sign-up",
  validate(signUpSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

authController.post(
  "/sign-in",
  validate(signInSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.signIn(req.body);
    res.status(201).send(serializeSignInResponse(userWithToken));
  })
);

authController.post(
  "/refresh",
  validate(refreshTokensSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.refreshTokens(req.body);
    res.status(201).send(serializeRefreshTokensResponse(userWithToken));
  })
);

authController.get(
  "/current",
  authorize(),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.getCurrentUser(req.userId);
    res.status(200).send(serializeUserResponse(user));
  })
);

authController.post(
  "/send-2fa-code",
  validate(send2FaSchema),
  asyncWrapper(async (req, res, next) => {
    await authService.send2FaCode(req.body);
    res.status(204).send();
  })
);

exports.authController = authController;
