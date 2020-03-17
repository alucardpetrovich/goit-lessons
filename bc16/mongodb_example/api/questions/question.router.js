import { questionController } from "./question.controller";
import express from "express";

const questionRouter = express.Router();

questionRouter.get("/", questionController.getQuestions);
questionRouter.post(
  "/",
  questionController.validateCreateQuestionBody,
  questionController.createQuestion
);
questionRouter.post(
  "/with-image",
  questionController.aggregateBodyForCreateQuestionWithImage,
  questionController.validateCreateQuestionWithImageBody,
  questionController.createQuestionWithImage
);

export default questionRouter;
