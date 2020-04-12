const { Router } = require("express");
const userController = require("./user.controller");

const userRouter = Router();

userRouter.post(
  "/",
  userController.validateCreateUser,
  userController.createUser
);
userRouter.get(
  "/current",
  userController.authorize,
  userController.getCurrentUser
);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.validateId, userController.getUserById);
userRouter.delete(
  "/:id",
  userController.validateId,
  userController.deleteUserById
);
userRouter.put(
  "/sign-in",
  userController.validateSignIn,
  userController.signIn
);
userRouter.put(
  "/:id",
  userController.validateId,
  userController.validateUpdateUser,
  userController.updateUser
);

userRouter.patch("/logout", userController.authorize, userController.logout);
userRouter.put(
  "/films/favourites/:id",
  userController.authorize,
  userController.validateId,
  userController.addFilmForUser
);

userRouter.delete(
  "/films/favourites/:id",
  userController.authorize,
  userController.validateId,
  userController.removeFilmForUser
);

module.exports = userRouter;
