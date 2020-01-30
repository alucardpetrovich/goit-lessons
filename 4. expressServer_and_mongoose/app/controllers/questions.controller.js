const QuestionsValidator = require("../helpers/questions.validator");
const QuestionModel = require("../models/questions.model");

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
      const question = await QuestionModel.findRandomQuestion();

      return res.status(200).json(question);
    } catch (err) {
      next(err);
    }
  }

  async _createQuestion(req, res, next) {
    try {
      const body = await QuestionsValidator.validateCreateQuestion(req.body);

      await QuestionModel.create(body);

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new QuestionsController();
