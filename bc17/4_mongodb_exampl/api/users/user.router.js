const { Router } = require("express");
const userController = require("./user.controller");

const userRouter = Router();

userRouter.post(
  "/",
  userController.validateCreateUser,
  userController.createUser
);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.validateId, userController.getUserById);
userRouter.delete(
  "/:id",
  userController.validateId,
  userController.deleteUserById
);
userRouter.put(
  "/:id",
  userController.validateId,
  userController.validateUpdateUser,
  userController.updateUser
);

userRouter.patch(
  "/:id/films/add",
  userController.validateId,
  userController.validateAddFilmForUser,
  userController.addFilmForUser
);

userRouter.patch(
  "/:id/films/remove",
  userController.validateId,
  userController.validateRemoveFilmForUser,
  userController.removeFilmForUser
);

module.exports = userRouter;
