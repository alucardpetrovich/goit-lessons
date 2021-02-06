import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import { validate } from "../helpers/validate.js";
import { authService } from "./auth.service.js";
import { composeUsers } from "../users/users.serializer.js";
import Joi from "joi";

const router = Router();

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post(
  "/sign-up",
  validate(signUpSchema),
  asyncWrapper(async (req, res) => {
    const newUser = await authService.signUp(req.body);
    res.status(201).send(composeUsers(newUser));
  })
);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post(
  "/sign-in",
  validate(signInSchema),
  asyncWrapper(async (req, res) => {
    const { user, token } = await authService.signIn(req.body);

    res.cookie("token", token, { httpOnly: true, signed: true });
    return res.status(201).send({
      user: composeUsers(user),
    });
  })
);

export const authController = router;
