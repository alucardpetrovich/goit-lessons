const BodyHelper = require("../helpers/bodyHelper");
const ValidationHelper = require("../helpers/validationHelper");
const questionModel = require("./question.model");

class QuestionController {
  get createQuestion() {
    return this._createQuestion.bind(this);
  }
  get getQuestions() {
    return this._getQuestions.bind(this);
  }

  async _createQuestion(req, res) {
    // questions.csv
    // parseBody
    // question, answer
    // save question to csv file
    // send 201 response to client
    const bodyString = await BodyHelper.aggregateBody(req);

    const body = ValidationHelper.validateCreateQuestion(bodyString);
    if (!body) {
      res.statusCode = 400;
      return res.end("ValidationError");
    }

    await questionModel.createQuestion(body);

    res.statusCode = 201;
    return res.end();
  }

  async _getQuestions(req, res) {
    // 1. Fetch questions data
    // 2. Set Content-Type header
    // 3. Set status code
    // 4. Send questions to client
    const questions = await questionModel.getQuestions();

    res.setHeader("Content-Type", "application/json");
    // res.setHeader("Set-Cookie", )
    res.statusCode = 200;
    return res.end(JSON.stringify(questions));
  }
}

module.exports = new QuestionController();
