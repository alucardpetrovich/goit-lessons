const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const { getConfig } = require("./config");
const { usersController } = require("./resources/users/users.controller");

class UsersServer {
  #app;
  #config;

  start() {
    this.#initServer();
    this.#initConfig();
    // this.initDatabase();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
    this.#startListening();
  }

  #initServer() {
    this.#app = express();
  }

  #initConfig() {
    const envPath = path.join(__dirname, "../.env");
    dotenv.config({ path: envPath });
    this.#config = getConfig();
  }

  #initMiddlewares() {
    this.#app.use(express.json());
    this.#app.use(morgan("combined"));
  }

  #initRoutes() {
    this.#app.use("/api/v1/users", usersController);
  }

  #initErrorHandling() {
    this.#app.use((err, req, res, next) => {
      const statusCode = err.status || 500;

      if (statusCode >= 500) {
        console.log(err);
      }

      res.status(statusCode).send(err.message);
    });
  }

  #startListening() {
    this.#app.listen(this.#config.port, () => {
      console.log("Server started listening on port", this.#config.port);
    });
  }
}

module.exports.UsersServer = UsersServer;
