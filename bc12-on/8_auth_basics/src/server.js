const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { getConfig } = require("./config");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { authRouter } = require("./resources/auth/auth.controller");
const { usersRouter } = require("./resources/users/users.controller");

class UsersServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  async startForTests() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  initServer() {
    this.app = express();
  }

  initConfig() {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });
  }

  async initDatabase() {
    await mongoose.connect(getConfig().dbUrl);
  }

  initMiddlewares() {
    this.app.use(express.json({ limit: "500kb" }));
    this.app.use(morgan("common"));
    this.configureCors();
  }

  initRoutes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { port } = getConfig();
    this.app.listen(port, () => {
      console.log("Started listening on port", port);
    });
  }

  configureCors() {
    const { allowedCorsOrigin } = getConfig();

    // this.app.use((req, res, next) => {
    //   res.set("Access-Control-Allow-Origin", allowedCorsOrigin);
    //   next();
    // });
    // this.app.options("/*", (req, res, next) => {
    //   res.set(
    //     "Access-Control-Allow-Methods",
    //     req.get("Access-Control-Request-Method")
    //   );
    //   res.set(
    //     "Access-Control-Allow-Headers",
    //     req.get("Access-Control-Request-Headers")
    //   );

    //   return res.status(200).send();
    // });
    this.app.use(cors({ origin: allowedCorsOrigin }));
  }
}

exports.UsersServer = UsersServer;
