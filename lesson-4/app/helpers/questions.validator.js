const Validator = require('node-validator');

class QuestionsValidator {
    // static validateCreateQuestion(body) {
    //     if ( !body ) {
    //         return { errCode: 400, message: 'No body' };
    //     }

    //     const { answer, question } = body;
    //     const isAnswerValid = answer && typeof answer === 'string';
    //     const isQuestionValid = question && typeof question === 'string';
    //     if ( !isAnswerValid || !isQuestionValid ) {
    //         return { errCode: 400, message: 'Invalid body format' };
    //     }
    // }

    static async validateCreateQuestion(body) {
        const validationRules = Validator.isObject()
            .withRequired('answer', Validator.isString())
            .withRequired('question', Validator.isString());

        return this._run(validationRules, body);
    }

    static async _run(validatorObj, objToValidate) {
        return new Promise((res, rej) => {
            Validator.run(validatorObj, objToValidate, (errCount, errors) => {
                if ( !errCount ) {
                    return res(objToValidate);
                }

                const validationError = new Error(JSON.stringify(errors));
                validationError.status = 400;

                rej(validationError);
            });
        });
    }

}

module.exports = QuestionsValidator;
