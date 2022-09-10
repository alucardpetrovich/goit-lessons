import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "http-errors";
import { conf } from "../../config";

export function authorize(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  let payload: jwt.JwtPayload = {};
  try {
    payload = jwt.verify(token, conf.jwt.secret) as jwt.JwtPayload;
  } catch (err) {
    return next(new Unauthorized("Unauthorized"));
  }

  (req as any).userId = payload.sub;

  next();
}
