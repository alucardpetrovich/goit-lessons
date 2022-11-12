import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Middleware } from "shared/types/middleware.type";

export enum ReqParts {
  QUERY = "query",
  PARAMS = "params",
  BODY = "body",
}

export function validateRequest(
  cls: ClassConstructor<any>,
  reqPart = ReqParts.BODY
): Middleware {
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
