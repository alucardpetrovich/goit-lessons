import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as path from "path";
import * as morgan from "morgan";
import { Express, NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { getConfig } from "./config";
import { usersController } from "./users/users.controller";

export class UsersServer {
  private server: Express = express();

  public async start() {
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  private initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  private async initDatabase() {
    try {
      const { url } = getConfig().database;
      await mongoose.connect(url);
      console.log("Successfully connected to MongoDB");
    } catch (err) {
      console.log("Database connection error", err);
      process.exit(1);
    }
  }

  private initMiddlewares() {
    this.server.use(express.json());
    this.server.use(morgan("tiny"));
  }

  private initRoutes() {
    this.server.use("/users", usersController);
  }

  private initErrorHandling() {
    this.server.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.status || 500;
        return res.status(statusCode).send({
          name: err.name,
          status: statusCode,
          message: err.message,
        });
      }
    );
  }

  private startListening() {
    const { api } = getConfig();

    this.server.listen(api.port, () => {
      console.log("Started listening on port", api.port);
    });
  }
}
