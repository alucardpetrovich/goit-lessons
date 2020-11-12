const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/users.router");

exports.AuthServer = class {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;

      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log("Started listening on port", PORT);
    });
  }
};
