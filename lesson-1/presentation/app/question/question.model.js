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

  async _createQuestion(questionBody) {
    const { question, answer } = questionBody;
    await this.createQuestionFileIfNotExist();

    await fsPromises.appendFile(
      this.questionsFilePath,
      `"${question}";"${answer}"\n`
    );
  }

  async createQuestionFileIfNotExist() {
    if (await this.exists(this.questionsFilePath)) {
      return;
    }

    await fsPromises.writeFile(this.questionsFilePath, '"question";"answer"\n');
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
