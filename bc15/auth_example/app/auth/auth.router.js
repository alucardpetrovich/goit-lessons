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

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
  }),
  authController.createSession
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  authController.createSession
);

authRouter.delete(
  "/sign-out",
  authController.authorize,
  authController.signOut
);

module.exports = authRouter;
