const { promises: fsPromises } = require('fs');
const path = require('path');

class QuestionsModel {

  get createQuestion() {
    return this._createQuestion.bind(this);
  }

  async _createQuestion({ question, answer }) {
    await fsPromises.appendFile(path.join(__dirname, 'questions.csv'), `\n"${question}";"${answer}"`);
  }

}

module.exports = new QuestionsModel();
