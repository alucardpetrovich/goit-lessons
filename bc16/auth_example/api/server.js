import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import authRouter from "./auth/auth.router";
import { passportStrategies } from "./auth/passport.strategies";

export class AuthServer {
  constructor(config) {
    this.server = null;
    this.routes = null;
    this.config = config;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDb();
    return this.startListening();
  }

  initRoutes() {
    this.server.use("/api/auth", authRouter);
    this.server.use((err, req, res, next) => {
      delete err.stack;
      next(err);
    });
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    passportStrategies.initLocalPassportStrategy();
    passportStrategies.initGoogleOAuthStrategy();
    this.server.use(passport.initialize());
    this.server.use(express.json());
    this.server.use(express.static("/tmp/questions"));
  }

  async initDb() {
    await mongoose.connect(this.config.mongodb_url);
  }

  startListening() {
    return this.server.listen(this.config.port, () => {
      console.log("Server started listening on port", this.config.port);
    });
  }
}
