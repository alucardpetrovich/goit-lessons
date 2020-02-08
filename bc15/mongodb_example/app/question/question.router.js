const { Router } = require("express");
const questionController = require("./question.controller");

const questionRouter = Router();

questionRouter.post(
  "/",
  questionController.validateCreateQuestion,
  questionController.createQuestion
);
questionRouter.get('/:questionId', questionController.getQuestionById);
questionRouter.get("/", questionController.getQuestions);

module.exports = questionRouter;
