import {
  ReqParts,
  validate,
} from "../7_auth_example/src/shared/middlewares/validate";
import * as Joi from "joi";

describe("Validate middleware test suite", () => {
  const schema = Joi.object({
    test: Joi.string().required(),
  }).required();

  describe("when validation thrown an error", () => {
    const req: any = {};
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    beforeAll(() => {
      const middleware = validate(schema, ReqParts.PARAMS);

      res.status.mockReturnThis();

      middleware(req, res, next);
    });

    it("should call res.status", () => {
      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(400);
    });

    it("should call res.send", () => {
      const expectedValidationResult = schema.validate(undefined);

      expect(res.send).toBeCalledTimes(1);
      expect(res.send).toBeCalledWith(expectedValidationResult.error);
    });

    it("should not call next", () => {
      expect(next).not.toBeCalled();
    });
  });

  describe("when validation successful", () => {
    const req: any = { params: { test: "hello test" } };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    beforeAll(() => {
      const middleware = validate(schema, ReqParts.PARAMS);

      res.status.mockReturnThis();

      middleware(req, res, next);
    });

    it("should not call res.status", () => {
      expect(res.status).not.toBeCalled();
    });

    it("should not call res.send", () => {
      expect(res.send).not.toBeCalled();
    });

    it("should call next", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
