import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export type ReqPart = "body" | "params" | "query";

export const validate = (
  schema: Joi.ObjectSchema<any>,
  reqPart: ReqPart = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req[reqPart], {
      stripUnknown: true,
    });
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    req.body = validationResult.value;

    next();
  };
};
