const express = require("express");
const UserController = require("./user.controller");

const userRouter = express.Router();

// CRUD

// Create
userRouter.post(
  "/",
  UserController.validateCreateUser,
  UserController.createUser
);

// Read
userRouter.get("/", UserController.getUsers);

// Update
userRouter.put(
  "/:id",
  UserController.validateUpdateUser,
  UserController.updateUser
);

// Delete
userRouter.delete("/:id", UserController.deleteUser);

console.log("userRouter", userRouter);

module.exports = userRouter;
