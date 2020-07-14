const { Router } = require("express");
const Joi = require("@hapi/joi");
const { validate } = require("../helpers/validate");
const authController = require("./auth.controller");
const { createControllerProxy } = require("../helpers/controllers.proxy");
const { authorize, authorizeWithCookies } = require("./auth.middleware");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: process.env.STATIC_BASE_PATH,
  filename: (req, file, callback) => {
    const { ext } = path.parse(file.originalname);
    return callback(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const authControllerProxy = createControllerProxy(authController);

const router = Router();

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const avatarSchema = Joi.object().required();
router.post(
  "/sign-up",
  upload.single("avatar"),
  validate(signUpSchema),
  validate(avatarSchema, "file"),
  authControllerProxy.signUp
);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/sign-in", validate(signInSchema), authControllerProxy.signIn);

router.get("/current", authorizeWithCookies, authControllerProxy.getLoggedUser);

exports.authRouter = router;
