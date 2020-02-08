const questionModel = require("./question.model");
const Validator = require("node-validator");

class QuestionController {
  get createQuestion() {
    return this._createQuestion.bind(this);
  }
  get getQuestions() {
    return this._getQuestions.bind(this);
  }
  get getQuestionById() {
    return this._getQuestionById.bind(this);
  }
  get validateCreateQuestion() {
    return this._validateCreateQuestion.bind(this);
  }

  async _createQuestion(req, res, next) {
    // questions.csv
    // parseBody
    // question, answer
    // save question to csv file
    // send 201 response to client

    try {
      await questionModel.createQuestion(req.body);
      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  }

  async _getQuestions(req, res, next) {
    // 1. Fetch questions data
    // 2. Set Content-Type header
    // 3. Set status code
    // 4. Send questions to client

    try {
      const questions = await questionModel.getQuestions();
      return res.json(questions);
    } catch (err) {
      next(err);
    }
  }

  async _getQuestionById(req, res, next) {
    try {
      const question = await questionModel.getQuestionById(
        req.params.questionId
      );
      if (!question) {
        const err = new Error("Question not found");
        err.status = 404;
        throw err;
      }

      return res.json(question);
    } catch (err) {
      next(err);
    }
  }

  _validateCreateQuestion(req, res, next) {
    // const body = ValidationHelper.validateCreateQuestion(req.body);

    const questionRules = Validator.isObject()
      .withRequired("question", Validator.isString())
      .withRequired("answer", Validator.isString());

    Validator.run(questionRules, req.body, (errorCount, errors) => {
      if (!errorCount) return next();

      const validationError = new Error(JSON.stringify(errors));
      validationError.status = 400;
      next(validationError);
    });
  }
}

module.exports = new QuestionController();
