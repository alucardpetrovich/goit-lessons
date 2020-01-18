const BodyHelper = require("../helpers/bodyHelper");
const ValidationHelper = require("../helpers/validationHelper");
const questionModel = require("./question.model");

class QuestionController {
  get createQuestion() {
    return this._createQuestion.bind(this);
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
}

module.exports = new QuestionController();
