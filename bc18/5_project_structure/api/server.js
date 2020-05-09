const express = require("express");
const usersRouter = require("./users/user.router");

module.exports = class Server {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      return res.status(err.status || 500).send(err.message);
    });
  }

  startListening() {
    const PORT = process.env.PORT;

    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
