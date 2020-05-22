import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/sign-up",
  authController.validateRegisterUser,
  authController.registerUser
);

router.post("/sign-in", authController.validateSignIn, authController.signIn);

router.patch("/sign-out", authController.authorize, authController.signOut);

router.get("/verify/:verificationToken", authController.verifyUser);

export const authRouter = router;
