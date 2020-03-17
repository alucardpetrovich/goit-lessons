import questionRouter from "./questions/question.router";
import express from "express";
import mongoose from "mongoose";

export class QuestionsServer {
  constructor(config) {
    this.server = null;
    this.routes = null;
    this.config = config;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDb();
    this.startListening();
  }

  initRoutes() {
    this.server.use("/questions", questionRouter);
    this.server.use((err, req, res, next) => {
      delete err.stack;
      next(err);
    });
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(express.static("/tmp/questions"));
  }

  async initDb() {
    await mongoose.connect(this.config.mongodb_url);
  }

  startListening() {
    this.server.listen(this.config.port, () => {
      console.log("Server started listening on port", this.config.port);
    });
  }
}
