import { Router } from "express";
import { userController } from "./users.controller";
import { upload, compressImage } from "./upload.middlewares";
import { userModel } from "./user.model";

const router = Router();

router.post(
  "/sign-up",
  upload.single("avatar"),
  compressImage,
  userController.validateSignUp,
  userController.signUp
);
router.get("/profile", userController.getUserProfile);

export const userRouter = router;
