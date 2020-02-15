const { Router } = require("express");
const authController = require("./auth.controller");
const passport = require("passport");

const authRouter = Router();

authRouter.post(
  "/sign-up/plain",
  authController.validateSignUpPlain,
  authController.signUpPlain
);
authRouter.post(
  "/sign-in/plain",
  authController.validateSignInPlain,
  passport.authenticate("local", { session: false }),
  authController.createSession
);

module.exports = authRouter;
