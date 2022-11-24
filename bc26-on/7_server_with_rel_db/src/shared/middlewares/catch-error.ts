import { Middleware } from "shared/types/middleware.type";

export function catchErrors(middleware: Middleware): Middleware {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
