import express from 'express';
import { sessionController } from './session.controller';
import { sessionValidator } from './session.validator';

const sessionRouter = express.Router();

sessionRouter.post(
  '/',
  sessionValidator.signIn,
  sessionController.signIn
);

export default sessionRouter;
