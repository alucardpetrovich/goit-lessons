const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionsSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

questionsSchema.statics.createQuestion = createQuestion;
questionsSchema.statics.getQuestions = getQuestions;
questionsSchema.statics.getQuestionById = getQuestionById;

async function createQuestion(questionBody) {
  return this.create(questionBody);
}

async function getQuestions() {
  return this.find();
}

async function getQuestionById(questionId) {
  return this.findById(questionId);
}

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;
