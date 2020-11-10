const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const { signUp, signIn } = require("./auth.controller");
const { signUpSchema, signInSchema } = require("./auth.schemes");

const router = Router();

router.post("/sign-up", validate(signUpSchema), signUp);
router.post("/sign-in", validate(signInSchema), signIn);

exports.authRouter = router;
