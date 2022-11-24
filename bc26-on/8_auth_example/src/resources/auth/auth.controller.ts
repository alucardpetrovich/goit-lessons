import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/validate";
import { catchErrors } from "../../shared/middlewares/catch-error";
import { authService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { transform } from "../../shared/transformer";
import { UserResponseSerializer } from "../users/serializers/user-response.serializer";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInSerializer } from "./serializers/sign-in.serializer";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(SignUpDto),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. throw 409 if exists +
    // 4. hash password +
    // 5. save user in DB +
    // 6. send successful serialized response +

    const user = await authService.signUp(req.body);
    res.status(201).send(transform(UserResponseSerializer, { user }));
  })
);

router.post(
  "/sign-in",
  validateRequest(SignInDto),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. throw 404 if does not exist +
    // 4. check password +
    // 5. throw error (403) if password is wrong +
    // 5. generate JWT-token +
    // 6. send successful serialized response +
    const result = await authService.signIn(req.body);
    res.status(201).send(transform(SignInSerializer, result));
  })
);

router.get(
  "/current",
  catchErrors(async (req, res, next) => {})
);

export const authController = router;
