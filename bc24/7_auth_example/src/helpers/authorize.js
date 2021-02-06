import jwt from "jsonwebtoken";
import { Unauthorized } from "./error.constructors.js";

export function authorize(req, res, next) {
  // 1. get token +
  // 2. verify jwt token +
  // 3. if verification failed - 401 +
  // 4. if verification successful +
  // 4.1. add req.userId +
  // 4.2. call next +

  const { token } = req.signedCookies;

  let uid;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    uid = payload.uid;
  } catch (err) {
    return next(new Unauthorized("Token is not valid"));
  }

  req.userId = uid;
  next();
}
