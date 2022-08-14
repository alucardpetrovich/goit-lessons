import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

// type ReqParts = 'params' | 'body' | 'query';
enum ReqParts {
  PARAMS = "params",
  BODY = "body",
  QUERY = "query",
}

export function validate(schema: Schema, reqPart: ReqParts = ReqParts.BODY) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req[reqPart], {
      abortEarly: false,
      allowUnknown: false,
    });
    if (result.error) {
      return res.status(400).send(result.error);
    }

    req[reqPart] = result.value;
    next();
  };
}
