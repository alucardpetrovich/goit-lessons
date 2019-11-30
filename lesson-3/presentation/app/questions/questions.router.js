const express = require('express');
const questionsController = require('./questions.controller');
const questionsValidator = require('./questions.validator');

const questionsRouter = express.Router();

questionsRouter.post(
  '/',
  questionsValidator.createQuestion,
  questionsController.createQuestion
);

module.exports = questionsRouter;
