const { promises: fsPromises } = require("fs");
const fs = require("fs");
const path = require("path");

class QuestionModel {
  constructor() {
    this.questionsFilePath = path.join(__dirname, "questions.csv");
  }

  get createQuestion() {
    return this._createQuestion.bind(this);
  }
  get getQuestions() {
    return this._getQuestions.bind(this);
  }
  get getQuestionById() {
    return this._getQuestionById.bind(this);
  }

  async _createQuestion(questionBody) {
    const { question, answer } = questionBody;
    await this.createQuestionFileIfNotExist();

    const questions = await this.getQuestions();

    await fsPromises.appendFile(
      this.questionsFilePath,
      `"${questions.length + 1}";"${question}";"${answer}"\n`
    );
  }

  async _getQuestions() {
    // 1. fetch csv content +
    // 2. cut first headers row
    // 3. Map strings array to objects array
    const questionsContent = await fsPromises.readFile(
      this.questionsFilePath,
      "utf8"
    );
    const questionStringsArray = questionsContent
      .split("\n")
      .slice(1)
      .filter(str => str);

    const questionObjectsArray = questionStringsArray
      .map(str => str.split(";"))
      .map(([id, question, answer]) => {
        return {
          id: id.replace(/"/gi, ""),
          question: question.replace(/"/gi, ""),
          answer: answer.replace(/"/gi, "")
        };
      });

    return questionObjectsArray;
  }

  async _getQuestionById(questionId) {
    const questions = await this._getQuestions();
    return questions.find(questn => questn.id === questionId);
  }

  async createQuestionFileIfNotExist() {
    if (await this.exists(this.questionsFilePath)) {
      return;
    }

    await fsPromises.writeFile(
      this.questionsFilePath,
      '"id";"question";"answer"\n'
    );
  }

  async exists(path) {
    return new Promise((res, rej) => {
      fs.exists(path, isExist => {
        res(isExist);
      });
    });
  }
}

module.exports = new QuestionModel();
