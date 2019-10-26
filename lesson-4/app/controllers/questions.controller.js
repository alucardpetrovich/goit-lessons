// const BodyHelper = require('../helpers/body.helper');
const QuestionsValidator = require('../helpers/questions.validator');
// const QuestionsDao = require('../models/questions.dao');
const QuestionModel = require('../models/questions.model');

class QuestionsController {

    constructor() {
    }

    get getRandomQuestion() {
        return this._getRandomQuestion.bind(this);
    }

    get createQuestion() {
        return this._createQuestion.bind(this);
    }

    async _getRandomQuestion(req, res, next) {
        try {
            // const counter = await QuestionsDao.getQuestionsCount();
            // const questionNumber = this._getRandomQuestionNumber(counter);

            // const question = await QuestionsDao.getQuestionByNumber(questionNumber);
            const question = await QuestionModel.findRandomQuestion();

            return res
                .status(200)
                .json(question)
            ;
        } catch(err) {
            next(err);
        }


        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(question));
    }

    async _createQuestion(req, res, next) {
        try {
            const body = await QuestionsValidator.validateCreateQuestion(req.body);

            await QuestionModel.create(body);

            // await QuestionsDao.createQuestion(body.question, body.answer);
            // await QuestionsDao.incrementQuestionsCount();

            return res.status(201).send();

        } catch(err) {
            next(err);
        }
        // const body = await BodyHelper.getBody(req);
        
        // const err = QuestionsValidator.validateCreateQuestion(body);
        // if ( err ) {
        //     res.statusCode = err.errCode;
        //     return res.end(err.message);
        // }

        // res.statusCode = 201;
        // res.end();
    }

}

module.exports = new QuestionsController();
