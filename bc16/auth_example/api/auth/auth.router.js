import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  authController.validateSignUp,
  authController.signUp
);

export default authRouter;
