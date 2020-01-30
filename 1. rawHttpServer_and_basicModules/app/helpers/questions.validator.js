
class QuestionsValidator {
    static validateCreateQuestion(body) {
        if ( !body ) {
            return { errCode: 400, message: 'No body' };
        }

        const { answer, question } = body;
        const isAnswerValid = answer && typeof answer === 'string';
        const isQuestionValid = question && typeof question === 'string';
        if ( !isAnswerValid || !isQuestionValid ) {
            return { errCode: 400, message: 'Invalid body format' };
        }
    }
}

module.exports = QuestionsValidator;
