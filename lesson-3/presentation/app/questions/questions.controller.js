const questionsModel = require('./questions.model');

class QuestionsController {
  constructor() {}

  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  async _createQuestion(req, res, next) {
    // + req body { questions, answer }
    // + save to questions file
    // + send resp to client
    try {
      await questionsModel.createQuestion(req.body);
      return res.status(201).send();
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new QuestionsController();
