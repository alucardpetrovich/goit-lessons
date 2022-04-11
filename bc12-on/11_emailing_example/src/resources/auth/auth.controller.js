const { Router } = require("express");
const { catchErrors } = require("../../middlewares/catch-errors");
const { validate } = require("../../middlewares/validate");
const { signUpSchema, signInSchema } = require("./auth.schemas");
const { authService } = require("./auth.service");
const { serializeUserResponse } = require("../users/users.serializers");
const { serializeSignInResponse } = require("./auth.serializers");

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validate(signUpSchema),
  catchErrors(async (req, res) => {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. if exists - throw 409 error +
    // 4. hash provided password +
    // 5. save user to DB +
    // 6. send successful response +
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

authRouter.post(
  "/sign-in",
  validate(signInSchema),
  catchErrors(async (req, res) => {
    // 1. validate req body +
    // 2. find user with such email +
    // 3. if user was not found - send 404 error +
    // 4. compare passwords +
    // 5. if password is wrong - send 403 error +
    // 6. generate JWT token +
    // 7. send successful response +
    const { user, token } = await authService.signIn(req.body);
    res.status(200).send(serializeSignInResponse(user, token));
  })
);

authRouter.get(
  "/verify/:token",
  catchErrors(async (req, res) => {
    await authService.verifyUser(req.params.token);
    res.status(200).send("User successfully verified email");
  })
);

exports.authRouter = authRouter;
