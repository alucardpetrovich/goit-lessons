import { questionModel } from "./question.model";
import Joi from "joi";
import formidable from "formidable";
import path from "path";
import { NotFoundError } from "../errors.helper";

export class QuestionController {
  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  get getQuestion() {
    return this._getQuestion.bind(this);
  }

  async getQuestions(req, res, next) {
    try {
      const questions = await questionModel.getQuestions();

      return res.status(200).json(questions);
    } catch (err) {
      next(err);
    }
  }

  async _getQuestion(req, res, next) {
    try {
      const { questionId } = req.params;

      const question = await questionModel.getQuestionById(questionId);
      if (!question) {
        throw new NotFoundError(`Question with id ${questionId} was not found`);
      }

      return res.status(200).json(question);
    } catch (err) {
      next(err);
    }
  }

  async _createQuestion(req, res, next) {
    try {
      const body = req.body;
      await questionModel.createQuestion(body.question, body.answer);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async createQuestionWithImage(req, res, next) {
    try {
      const body = req.body;
      const filePath = body.question_image.path;
      const fileStats = path.parse(filePath);
      const fileUrl = "http://localhost:3000/" + fileStats.base;

      await questionModel.createQuestion(body.question, body.answer, fileUrl);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async validateCreateQuestionBody(req, res, next) {
    const questionRules = Joi.object()
      .keys({
        question: Joi.string(),
        answer: Joi.string()
      })
      .with("question", "answer");

    const result = Joi.validate(req.body, questionRules);
    if (result.error) {
      const err = new Error(result.error.message);
      err.status = 400;

      return next(err);
    }

    next();
  }

  async validateCreateQuestionWithImageBody(req, res, next) {
    const questionRules = Joi.object().keys({
      question: Joi.string().required(),
      answer: Joi.string().required(),
      question_image: Joi.object().required()
    });

    const result = Joi.validate(req.body, questionRules);

    console.log("result", result);

    if (result.error) {
      const err = new Error(result.error.message);
      err.status = 400;

      return next(err);
    }

    next();
  }

  aggregateBodyForCreateQuestionWithImage(req, res, next) {
    const form = formidable({ multiples: true, uploadDir: "/tmp/questions" });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      req.body = {
        ...fields,
        ...files
      };

      next();
    });
  }
}

export const questionController = new QuestionController();
