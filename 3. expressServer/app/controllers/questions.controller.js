const QuestionsValidator = require("../helpers/questions.validator");
const QuestionsDao = require("../models/questions.dao");

class QuestionsController {
  constructor() {}

  get getRandomQuestion() {
    return this._getRandomQuestion.bind(this);
  }

  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  async _getRandomQuestion(req, res, next) {
    try {
      const counter = await QuestionsDao.getQuestionsCount();
      const questionNumber = this._getRandomQuestionNumber(counter);

      const question = await QuestionsDao.getQuestionByNumber(questionNumber);

      return res.status(200).json(question);
    } catch (err) {
      next(err);
    }
  }

  async _createQuestion(req, res, next) {
    try {
      const body = await QuestionsValidator.validateCreateQuestion(req.body);

      await QuestionsDao.createQuestion(body.question, body.answer);
      await QuestionsDao.incrementQuestionsCount();

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  }

  _getRandomQuestionNumber(counter) {
    return Math.ceil(Math.random() * counter);
  }
}

module.exports = new QuestionsController();
