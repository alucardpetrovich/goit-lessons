import express from "express";
import { getPaths } from "./helpers/utils.js";
import dotenv from "dotenv";
import path from "path";
import { usersController } from "./users/users.controller.js";

export class UsersServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initConfig();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initConfig() {
    const { __dirname } = getPaths(import.meta.url);
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/users", usersController);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
