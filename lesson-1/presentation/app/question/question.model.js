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

  async _createQuestion(questionBody) {
    const { question, answer } = questionBody;
    await this.createQuestionFileIfNotExist();

    await fsPromises.appendFile(
      this.questionsFilePath,
      `"${question}";"${answer}"\n`
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
      .map(([question, answer]) => {
        return {
          question: question.replace(/"/gi, ""),
          answer: answer.replace(/"/gi, "")
        };
      });

    return questionObjectsArray;
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
