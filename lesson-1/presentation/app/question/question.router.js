const questionController = require("./question.controller");

module.exports = [
  {
    method: "POST",
    path: "/questions",
    handler: questionController.createQuestion
  }
];
