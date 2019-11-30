const validator = require('node-validator');

class QuestionsValidator {

  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  async _createQuestion(req, res, next) {
    const createQuestionRules = validator.isObject()
      .withRequired('question', validator.isString())
      .withRequired('answer', validator.isString())
    ;

    validator.run(createQuestionRules, req.body, (errCount, errors) => {
      if ( errCount ) {
        const validationError = new Error(JSON.stringify(errors));
        validationError.status = 400;
        return next(validationError);
      }

      return next();
    });
  }

}

module.exports = new QuestionsValidator();
