import { questionController } from "./question.controller";

export const questionRouter = [
  {
    method: "GET",
    url: "/questions",
    handler: questionController.getQuestions
  },
  {
    method: 'POST',
    url: '/questions',
    handler: questionController.createQuestion
  }
];
