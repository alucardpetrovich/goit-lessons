const { Router } = require("express");
const userController = require("./user.controller");
const authController = require("../auth/auth.controller");
const userValidator = require("./user.validator");
const validationHelper = require("../helpers/validation");

const userRouter = Router();

userRouter.get(
  "/current",
  authController.authorize,
  userController.getCurrentUser
);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", validationHelper.validateId, userController.getUserById);
userRouter.delete(
  "/:id",
  validationHelper.validateId,
  userController.deleteUserById
);
userRouter.put(
  "/:id",
  validationHelper.validateId,
  userValidator.validateUpdateUser,
  userController.updateUser
);

userRouter.put(
  "/films/favourites/:id",
  authController.authorize,
  validationHelper.validateId,
  userController.addFilmForUser
);

userRouter.delete(
  "/films/favourites/:id",
  authController.authorize,
  validationHelper.validateId,
  userValidator.validateRemoveFilmForUser,
  userController.removeFilmForUser
);

module.exports = userRouter;
