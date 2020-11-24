const { Router } = require("express");
const { authorize } = require("../helpers/authorize.middleware");
const { createControllerProxy } = require("../helpers/controller.proxy");
const { validate } = require("../helpers/validate.middleware");
const authController = require("./auth.controller");
const { signUpSchema, signInSchema } = require("./auth.schemes");

const authControllerProxy = createControllerProxy(authController);

const router = Router();

router.post("/sign-up", validate(signUpSchema), authControllerProxy.signUp);
router.post("/sign-in", validate(signInSchema), authControllerProxy.signIn);
router.delete("/sign-out", authorize, authControllerProxy.signOut);
router.get('/verify/:verificationToken', authControllerProxy.verifyUser);

exports.authRouter = router;
