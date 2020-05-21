import { Router } from "express";
import userController from "./user.controller";

const usersRouter = Router();

// C - Create
usersRouter.post(
  "/",
  userController.validateCreateUser,
  userController.createUser
);

// R - Read
usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/:id", userController.validateGetUser, userController.getUser);

// U - Update
usersRouter.put(
  "/:id",
  userController.validateUpdateUser,
  userController.updateUser
);

// D - Delete
usersRouter.delete(
  "/:id",
  userController.validateDeleteUser,
  userController.deleteUser
);

export default usersRouter;
