require("./config");
const express = require("express");
const mongoose = require("mongoose");
const { usersRouter } = require("./users/users.router");

module.exports = class UsersServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDatabaseConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabaseConnection() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
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
