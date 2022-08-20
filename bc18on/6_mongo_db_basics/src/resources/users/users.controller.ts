import { validate, ReqParts } from "../../shared/middlewares/validate";
import { Router } from "express";
import {
  createUserSchema,
  updateUserSchema,
  validateIdSchema,
} from "./users.schemas";
import { serializeSingleUserResponse } from "./users.serializers";
import { usersService } from "./users.service";
import { catchAsync } from "../../shared/middlewares/catch-async";

const router = Router();

router.post(
  "/",
  validate(createUserSchema),
  catchAsync(async (req, res, next) => {
    // 1. validate req body +
    // 2. create unique id for new user +
    // 3. save user +
    // 4. serialize user +
    // 5. send successful response +
    const user = await usersService.createUser(req.body);
    res.status(201).send(serializeSingleUserResponse(user));
  })
);

router.get(
  "/:id",
  validate(validateIdSchema, ReqParts.PARAMS),
  catchAsync(async (req, res, next) => {
    // 1. find user by id +
    // 2. if user not found - throw 404 error +
    // 3. if exists - serialize +
    // 4. send successful response +
    const user = await usersService.getUserById(req.params.id);
    res.status(200).send(serializeSingleUserResponse(user));
  })
);

router.patch(
  "/:id",
  validate(validateIdSchema, ReqParts.PARAMS),
  validate(updateUserSchema),
  catchAsync(async (req, res, next) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(serializeSingleUserResponse(user));
  })
);

export const usersRouter = router;
