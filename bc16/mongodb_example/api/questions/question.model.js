import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  fileUrl: { type: String, required: false }
});

questionSchema.statics.getQuestions = getQuestions;
questionSchema.statics.createQuestion = createQuestion;
questionSchema.statics.getQuestionById = getQuestionById;

async function getQuestions() {
  return this.find();
}

async function getQuestionById(questionId) {
  // return this.findOne({ _id: questionId });
  return this.findById(questionId);
}

async function createQuestion(question, answer, fileUrl) {
  return this.create({ question, answer, fileUrl });
}

// collection name: questions
export const questionModel = mongoose.model("Question", questionSchema);
