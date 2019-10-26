const fs = require('fs');
const fsPromises = fs.promises;
const csvParser = require('csv-parser');
const path = require('path');

class QuestionsDao {
    constructor() {
        this._questionsCountPath = path.join(__dirname, '../models/questionsCount.txt');
        this._questionsPath = path.join(__dirname, '../models/questions.model.csv');
    }

    async incrementQuestionsCount() {
        const counter = await fsPromises.readFile(this._questionsCountPath, 'utf8');
        const newCounter = parseInt(counter, 10) + 1;

        return fsPromises.writeFile(this._questionsCountPath, newCounter, 'utf8');
    }

    async getQuestionsCount() {
        const counter = await fsPromises.readFile(this._questionsCountPath, 'utf8');
        return parseInt(counter, 10);
    }


    async getQuestionByNumber(number) {
        let counter = 0;

        return new Promise((res, rej) => {
            fs.createReadStream(this._questionsPath)
                .pipe(csvParser({
                    separator: ';'
                }))
                .on('data', data => {
                    counter++;
                    if ( counter === number ) {
                        res(data);
                    }
                })
        });
    }

    async createQuestion(question, answer) {
        await fsPromises.appendFile(this._questionsPath, `\n"${question}";"${answer}"`);
    }
}

module.exports = new QuestionsDao();
