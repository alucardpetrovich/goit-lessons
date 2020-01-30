const QuestionsController = require("../controllers/questions.controller");
const express = require("express");

const questionsRouter = express.Router();

questionsRouter.post("/", QuestionsController.createQuestion);
questionsRouter.get("/random", QuestionsController.getRandomQuestion);

module.exports = questionsRouter;
