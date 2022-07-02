const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { getConfig } = require("./config");
const { authController } = require("./resources/auth/auth.controller");

class UsersServer {
  #app;
  #config;

  async start() {
    this.#initServer();
    this.#initConfig();
    await this.#initDatabase();
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

  async #initDatabase() {
    await mongoose.connect(this.#config.db.url);
  }

  #initMiddlewares() {
    this.#app.use(express.json());
    this.#app.use(morgan("common"));
    this.#app.use(cors(this.#config.cors));
    this.#app.use(cookieParser());
  }

  #initRoutes() {
    this.#app.use("/api/v1/auth", authController);
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
