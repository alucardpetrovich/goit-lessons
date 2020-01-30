const QuestionsRouter = require("./routers/questions.router");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

async function main() {
  const app = express();

  app.use(bodyParser());
  app.use("/questions", QuestionsRouter);

  await mongoose.connect(config.mongodb_url);

  console.log("attaching server to port");
  const server = app.listen(config.port, () => {
    console.log("Server listening on port", config.port);
  });

  return { app, server };
}
