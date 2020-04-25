const { Router } = require("express");
const authController = require("./auth.controller");
const authValidator = require("./auth.validator");

const authRouter = Router();

authRouter.post(
  "/sign-up",
  authValidator.validateSignUp,
  authController.signUp
);
authRouter.put("/sign-in", authValidator.validateSignIn, authController.signIn);

authRouter.get("/verify/:token", authController.verifyEmail);

authRouter.patch("/logout", authController.authorize, authController.logout);

module.exports = authRouter;
