const QuestionsController = require('../controllers/questions.controller');

const questionsRouter = {
    'POST /questions': QuestionsController.createQuestion,
    'GET /questions/random': QuestionsController.getRandomQuestion,
};

module.exports = questionsRouter;
