const { Router } = require("express");
const { catchErrors } = require("../../shared/middlewares/catch-errors");
const { validate } = require("../../shared/middlewares/validate");
const { signUpSchema, signInSchema } = require("./auth.schemas");
const { authService } = require("./auth.service");
const {
  serializeSignUpResponse,
  serializeSignInResponse,
} = require("./auth.serializers");

const router = Router();

router.post(
  "/sign-up",
  validate(signUpSchema),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. find user by email +
    // 3. if such user exists - throw 409 error +
    // 4. hash password +
    // 5. save user +
    // 6. send successful response +
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeSignUpResponse(user));
  })
);

router.post(
  "/sign-in",
  validate(signInSchema),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. find user by email +
    // 3. if user not exists - throw 404 error +
    // 4. compare password +
    // 5. if password comparison failed - throw 403 error +
    // 6. generate jwt-token +
    // 7. send successful response +
    const signInResult = await authService.signIn(req.body);
    res.status(201).send(serializeSignInResponse(signInResult));
  })
);

exports.authRouter = router;
