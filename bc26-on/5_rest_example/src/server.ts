import express, { NextFunction, Request, Response } from "express";
import { getConfig } from "./config";
import { HttpError } from "http-errors";
import { usersController } from "./resources/users/users.controller";

export class UsersServer {
  private app = express();
  private config = getConfig();

  start() {
    // this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initRoutes() {
    this.app.use("/users", usersController);
  }

  private initErrorHandling() {
    this.app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        if (status === 500) {
          console.log(err);
        }

        res.status(status).send(err.message);
      }
    );
  }

  private startListening() {
    this.app.listen(this.config.port, () => {
      console.log("Server started on port", this.config.port);
    });
  }
}