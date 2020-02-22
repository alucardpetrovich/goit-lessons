const express = require("express");
const { port, db_url, test_db_url } = require("./config");
const questionRouter = require("./question/question.router");
const mongoose = require("mongoose");

class QuestionServer {
  constructor() {
    this.app = null;
    this.routes = [];
  }

  async start(isTest = false) {
    this.isTest = isTest;

    this.initServer();
    await this.initDbConnection();
    this.initMiddlewares();
    this.initRoutes();
    return this.serverListen();
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/questions", questionRouter);
    this.app.use((err, req, res, next) => {
      delete err.stack;
      next(err);
    });
  }

  initServer() {
    this.app = express();
  }

  async initDbConnection() {
    await mongoose.connect(this.isTest ? test_db_url : db_url);
  }

  serverListen() {
    return this.app.listen(port, () => {
      console.log("Server started listening on port", port);
    });
  }

  async clearDb() {
    try {
      await mongoose.connection.db.dropDatabase();
      console.log("Cleared up database");
    } catch (err) {
      console.log("Error occured when tried to clear MongoDB", err);
    }
  }
}

if (require.main === module) {
  new QuestionServer().start();
} else {
  module.exports = QuestionServer;
}
