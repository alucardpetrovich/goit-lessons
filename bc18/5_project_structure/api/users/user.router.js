const { Router } = require("express");
const userController = require("./user.controller");

const usersRouter = Router();

// C - Create
usersRouter.post(
  "/",
  userController.validateCreateUser,
  userController.createUser
);

// R - Read
usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/:id", userController.getUser);

// U - Update
usersRouter.put(
  "/:id",
  userController.validateUpdateUser,
  userController.updateUser
);

// D - Delete
usersRouter.delete("/:id", userController.deleteUser);

module.exports = usersRouter;
