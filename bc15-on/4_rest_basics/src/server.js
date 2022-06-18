const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { getConfig } = require("./config");
const { usersController } = require("./resources/users/users.controller");

class UsersServer {
  #app;
  #config;

  start() {
    this.#initServer();
    this.#initConfig();
    // this.#initDatabase();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
    this.#startListening();
  }

  #initServer() {
    this.#app = express();
  }

  #initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
    this.#config = getConfig();
  }

  #initMiddlewares() {
    this.#app.use(express.json());
    this.#app.use(morgan("common"));
    this.#app.use(cors(this.#config.cors));
  }

  #initRoutes() {
    this.#app.use("/api/v1/users", usersController);
  }

  #initErrorHandling() {
    this.#app.use((err, req, res, next) => {
      const status = err.status || 500;
      res.status(status).send({
        message: err.message,
        name: err.name,
      });
    });
  }

  #startListening() {
    this.#app.listen(this.#config.port, () => {
      console.log("Server started listening on port", this.#config.port);
    });
  }
}

exports.UsersServer = UsersServer;
