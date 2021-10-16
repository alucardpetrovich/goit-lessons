import { Router } from "express";
import { validate } from "../helpers/validate";
import { serializeUsers } from "./user.serializer";
import {
  createUserSchema,
  idParamSchema,
  updateUserSchema,
} from "./users.schema";
import { usersService } from "./users.service";

const router = Router();

createUserSchema.validate({}, { stripUnknown: true });

// 1. C - Create
router.post("/", validate(createUserSchema), async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);
    return res.status(201).send(serializeUsers(newUser));
  } catch (err) {
    next(err);
  }
});

// 2. R - Read
router.get("/", async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    return res.status(200).send(serializeUsers(users));
  } catch (err) {
    next(err);
  }
});
router.get(
  "/:id",
  validate(idParamSchema, "params"),
  async (req, res, next) => {
    try {
      const user = await usersService.getUser(req.params.id);
      return res.status(200).send(serializeUsers(user));
    } catch (err) {
      next(err);
    }
  }
);

// 3. U - Update
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  async (req, res, next) => {
    try {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      return res.status(200).send(serializeUsers(updatedUser));
    } catch (err) {
      next(err);
    }
  }
);

// 4. D - Delete
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  async (req, res, next) => {
    try {
      await usersService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export const usersController = router;
