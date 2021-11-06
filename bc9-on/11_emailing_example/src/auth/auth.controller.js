const { Router } = require("express");
const { serializeUser } = require("../users/user.serializer");
const { validate } = require("../helpers/validate");
const { signUpSchema, signInSchema } = require("./auth.schema");
const { authService } = require("./auth.service");
const { serializeUserWithToken } = require("./auth.serializer");

const router = Router();

router.post("/sign-up", validate(signUpSchema), async (req, res, next) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeUser(user));
  } catch (err) {
    next(err);
  }
});

router.post("/sign-in", validate(signInSchema), async (req, res, next) => {
  try {
    const userWithToken = await authService.signIn(req.body);
    res.status(201).send(serializeUserWithToken(userWithToken));
  } catch (err) {
    next(err);
  }
});

router.get("/verify/:token", async (req, res, next) => {
  try {
    await authService.verifyUser(req.params.token);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

exports.authController = router;
