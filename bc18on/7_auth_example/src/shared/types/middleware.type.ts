import { NextFunction, Request, Response } from "express";

export type Middleware<ReturnValue = unknown> = (
  req: Request,
  res: Response,
  next: NextFunction
) => ReturnValue;
