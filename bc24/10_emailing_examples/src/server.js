import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import sgMail from "@sendgrid/mail";
import { authController } from "./auth/auth.controller.js";
import { usersController } from "./users/users.controller.js";
import { getPaths } from "./helpers/utils.js";
import cookieParser from "cookie-parser";

export class AuthServer {
  constructor() {
    this.server = null;
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

  async startForTest() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  initServer() {
    this.server = express();
  }

  initConfig() {
    const { __dirname } = getPaths(import.meta.url);
    dotenv.config({ path: path.join(__dirname, "../.env") });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cookieParser(process.env.COOKIE_SECRET));
  }

  initRoutes() {
    this.server.use("/auth", authController);
    this.server.use("/users", usersController);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      console.log(err);
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
