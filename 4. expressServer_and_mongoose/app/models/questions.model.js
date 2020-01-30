const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});
questionSchema.statics.findRandomQuestion = findRandomQuestion;

async function findRandomQuestion() {
    const questionsCount = await this.count();
    
    const randomQuestionNumber = Math.floor(Math.random() * questionsCount);
    const [ question ] = await this.find().limit(1).skip(randomQuestionNumber);
    
    return question;
}

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;
