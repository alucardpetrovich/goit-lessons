const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { usersRouter } = require("./users/users.controller");

exports.UsersServer = class {
  start() {
    this.initServer();
    this.initConfig();
    // await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;

      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
