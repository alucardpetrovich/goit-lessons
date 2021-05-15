const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { usersRouter } = require("./users/users.controller");
const mongoose = require("mongoose");

exports.UsersServer = class {
  async start() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
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

  async initDatabase() {
    try {
      const { MONGODB_URL } = process.env;
      await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log("Error in DB connection", err);
      process.exit(1);
    }
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
