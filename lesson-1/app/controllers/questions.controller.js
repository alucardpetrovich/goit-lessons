const BodyHelper = require('../helpers/body.helper');
const QuestionsValidator = require('../helpers/questions.validator');
const QuestionsDao = require('../models/questions.dao');

class QuestionsController {

    constructor() {
    }

    get getRandomQuestion() {
        return this._getRandomQuestion.bind(this);
    }

    get createQuestion() {
        return this._createQuestion.bind(this);
    }

    async _getRandomQuestion(req, res) {
        const counter = await QuestionsDao.getQuestionsCount();
        const questionNumber = this._getRandomQuestionNumber(counter);

        const question = await QuestionsDao.getQuestionByNumber(questionNumber);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(question));
    }

    async _createQuestion(req, res) {
        const body = await BodyHelper.getBody(req);
        
        const err = QuestionsValidator.validateCreateQuestion(body);
        if ( err ) {
            res.statusCode = err.errCode;
            return res.end(err.message);
        }

        await QuestionsDao.createQuestion(body.question, body.answer);
        await QuestionsDao.incrementQuestionsCount();

        res.statusCode = 201;
        res.end();
    }

    _getRandomQuestionNumber(counter) {
        return Math.ceil( Math.random() * counter );
    }

}

module.exports = new QuestionsController();
