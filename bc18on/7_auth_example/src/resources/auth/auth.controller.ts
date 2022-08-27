import { Router } from "express";
import { authorize } from "../../shared/middlewares/authorize";
import { catchAsync } from "../../shared/middlewares/catch-async";
import { validate } from "../../shared/middlewares/validate";
import { serializeUserResponse } from "../users/users.serializers";
import { signInSchema, signUpSchema } from "./auth.schemas";
import { serializeSignIn } from "./auth.serializers";
import { authService } from "./auth.service";

const router = Router();

router.post(
  "/sign-up",
  validate(signUpSchema),
  catchAsync(async (req, res, next) => {
    // 1. validate req body +
    // 2. find existing user with such email +
    // 3. if exists - throw 409 error +
    // 4. hash password +
    // 5. save user +
    // 6. serialize user for response +
    // 7. send successful response +
    const user = await authService.signUp(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

router.post(
  "/sign-in",
  validate(signInSchema),
  catchAsync(async (req, res, next) => {
    // 1. validate req body +
    // 2. find user with such email +
    // 3. if user does not exist - throw 404 error +
    // 4. check password +
    // 5. if password is wrong - throw 403 error +
    // 6. generate auth token +
    // 7. serialize response +
    // 8. send successful response +
    const { user, token } = await authService.signIn(req.body);
    res.status(201).send(serializeSignIn(user, token));
  })
);

router.get(
  "/current",
  authorize,
  catchAsync(async (req, res, next) => {
    const user = await authService.getCurrentUser((req as any).userId);
    res.status(200).send(serializeUserResponse(user));
  })
);

export const authController = router;
