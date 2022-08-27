import Joi, { Schema } from "joi";
import { Middleware } from "../types/middleware.type";

export enum ReqParts {
  BODY = "body",
  QUERY = "query",
  PARAMS = "params",
}

export function validate(
  schema: Schema,
  reqPart: ReqParts = ReqParts.BODY
): Middleware {
  return (req, res, next) => {
    const validationRes = schema.validate(req[reqPart], {
      abortEarly: false,
      allowUnknown: false,
    });
    if (validationRes.error) {
      return res.status(400).send(validationRes.error);
    }

    next();
  };
}
