const QuestionsController = require('../controllers/questions.controller');
const express = require('express');

// const questionsRouter = {
//     'POST /questions': QuestionsController.createQuestion,
//     'GET /questions/random': QuestionsController.getRandomQuestion,
// };
const questionsRouter = express.Router();

questionsRouter.post('/', QuestionsController.createQuestion);
questionsRouter.get('/random', QuestionsController.getRandomQuestion);

module.exports = questionsRouter;
