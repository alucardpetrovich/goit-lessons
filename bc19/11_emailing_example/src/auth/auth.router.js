const { Router } = require("express");
const Joi = require("@hapi/joi");
const { validate } = require("../helpers/validate");
const authController = require("./auth.controller");
const { createControllerProxy } = require("../helpers/controllers.proxy");
const { authorize, authorizeWithCookies } = require("./auth.middleware");

const authControllerProxy = createControllerProxy(authController);

const router = Router();

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/sign-up", validate(signUpSchema), authControllerProxy.signUp);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/sign-in", validate(signInSchema), authControllerProxy.signIn);

router.get("/current", authorizeWithCookies, authControllerProxy.getLoggedUser);

router.get("/verify/:verificationToken", authControllerProxy.verifyUser);

exports.authRouter = router;
