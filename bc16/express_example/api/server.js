import questionRouter from "./questions/question.router";
import express from "express";

export class QuestionsServer {
  constructor(config) {
    this.server = null;
    this.routes = null;
    this.config = config;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
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

  startListening() {
    this.server.listen(this.config.port, () => {
      console.log("Server started listening on port", this.config.port);
    });
  }
}
