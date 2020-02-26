import path from "path";
import { promises as fsPromises } from "fs";

export class QuestionModel {
  constructor() {
    this.questionsFilePath = path.join(__dirname, "../../db/questions.csv");
  }

  async getQuestions() {
    const questionsCsvContent = await fsPromises.readFile(
      this.questionsFilePath,
      "utf-8"
    );

    const [headersString, ...questionRows] = questionsCsvContent
      .split("\n")
      .filter(row => row);
    const headers = this.extractValuesFromStrRow(headersString);
    const questionsArr = questionRows.map(questn => {
      const questionValues = this.extractValuesFromStrRow(questn);

      return questionValues.reduce((questionObject, value, i) => {
        questionObject[headers[i]] = value;
        return questionObject;
      }, {});
    });

    return questionsArr;
  }

  async createQuestion(question, answer) {
    await fsPromises.appendFile(
      this.questionsFilePath,
      `"${question}","${answer}"\n`
    );
  }

  extractValuesFromStrRow(strRow) {
    return strRow.split(",").map(cell => cell.replace(/"/g, ""));
  }
}

export const questionModel = new QuestionModel();
