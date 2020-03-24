import { Router } from "express";
import { authController } from "./auth.controller";
import passport from "passport";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  authController.validateSignUp,
  authController.signUp
);
authRouter.post(
  "/sign-in/plain",
  passport.authenticate("local", { session: false }),
  authController.createSession
);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/plus.login"
    ]
  }),
  authController.createSession
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.createSession
);

authRouter.delete(
  "/sign-out",
  authController.authorize,
  authController.signOut
);
// sign-in plain
// google OAuth2.0
// auth middleware
// sign out

export default authRouter;
