const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const { authController } = require("./auth/auth.controller");
const { usersController } = require("./users/users.controller");

exports.AuthServer = class {
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
    const { DATABASE_URL } = process.env;

    try {
      await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log("Database connection error", err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/api/auth", authController);
    this.app.use("/api/users", usersController);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      if (statusCode === 500) {
        console.log(err);
      }
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
