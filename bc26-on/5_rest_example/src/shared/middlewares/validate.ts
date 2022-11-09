import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export enum ReqParts {
  QUERY = "query",
  PARAMS = "params",
  BODY = "body",
}

export function validateRequest(
  cls: ClassConstructor<any>,
  reqPart = ReqParts.BODY
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req, res, next) => {
    const dto = plainToInstance(cls, req[reqPart], {
      enableImplicitConversion: true,
    });

    const errors = await validate(dto, { forbidNonWhitelisted: true });
    if (errors.length) {
      res.status(400).send(errors);
      return;
    }

    req[reqPart] = dto as any;

    next();
  };
}
