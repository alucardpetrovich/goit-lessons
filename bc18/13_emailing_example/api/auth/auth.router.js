import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/sign-up", authController.validateSignUp, authController.signUp);

router.put("/sign-in", authController.validateSignIn, authController.signIn);

router.put("/sign-out", authController.authorize, authController.signOut);

router.get("/verify", authController.verify);

export const authRouter = router;
