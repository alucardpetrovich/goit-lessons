import express from 'express';
import { userController } from './user.controller';
import { userValidator } from './user.validator';

const userRouter = express.Router();

userRouter.post(
  '/',
  userValidator.registerUser,
  userController.registerUser
);

export default userRouter;
