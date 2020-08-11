const { Router } = require("express");
const {
  validateSignUp,
  signUp,
  verifyUserEmail,
} = require("./auth.controller");

const router = Router();

router.post("/sign-up", validateSignUp, signUp);
router.get("/verify", verifyUserEmail);

exports.authRouter = router;
