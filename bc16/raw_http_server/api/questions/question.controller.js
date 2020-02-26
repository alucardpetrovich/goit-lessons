import { questionModel } from "./question.model";
import Joi from "joi";

export class QuestionController {
  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  async getQuestions(req, res) {
    // 1. get questions with questions model method
    // 2. send questions in response
    const questions = await questionModel.getQuestions();

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(questions));
  }

  async _createQuestion(req, res) {
    // 1. get request body
    // 2. validate request body
    // 3. create question through model method
    // 4. send response to client
    const bodyString = await this.aggregateRequestBody(req);

    let body;
    try {
      body = await this.validateCreateQuestionBody(bodyString);
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify(err));
    }

    await questionModel.createQuestion(body.question, body.answer);

    res.statusCode = 204;
    return res.end();
  }

  async aggregateRequestBody(req) {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    return new Promise((res, rej) => {
      req.on("end", () => {
        res(body);
      });

      req.on("abort", () => {
        rej();
      });
    });
  }

  async validateCreateQuestionBody(bodyString) {
    const body = JSON.parse(bodyString);

    const questionRules = Joi.object()
      .keys({
        question: Joi.string(),
        answer: Joi.string()
      })
      .with("question", "answer");

    const result = Joi.validate(body, questionRules);
    if (result.error) {
      throw new Error(result.error);
    }

    return body;
  }
}

export const questionController = new QuestionController();
