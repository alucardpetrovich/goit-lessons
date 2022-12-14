import jwt from "jsonwebtoken";
import { Unauthorized } from "http-errors";
import { getConfig } from "../../config";
import { Middleware } from "../types/middleware.type";
import { JwtClaims } from "shared/types/jwt-claims.interface";

export const authorize: Middleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.replace("Bearer ", "");

  const cfg = getConfig();

  let payload: JwtClaims;
  try {
    payload = jwt.verify(token, cfg.jwt.secret) as JwtClaims;
  } catch (err) {
    throw new Unauthorized();
  }

  (req as any).userId = payload.sub;
};
