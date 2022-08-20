import { NextFunction, Request, Response } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => unknown;

export function catchAsync(middleware: Middleware): Middleware {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
