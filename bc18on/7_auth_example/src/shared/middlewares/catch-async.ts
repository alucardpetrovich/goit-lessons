import { Middleware } from "../types/middleware.type";

export function catchAsync(middleware: Middleware): Middleware {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
