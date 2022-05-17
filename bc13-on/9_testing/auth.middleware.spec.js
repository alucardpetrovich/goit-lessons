const {
  authorize,
} = require("../7_auth_basics/src/shared/middlewares/authorize");
const jwt = require("jsonwebtoken");

const config = { jwt: { secret: "test" } };
jest.mock("../7_auth_basics/src/config", () => ({
  getConfig: () => config,
}));

describe("Auth middleware unit tests", () => {
  describe("when user have not provided token", () => {
    let req = { headers: {} };
    let res = null;
    let next = jest.fn();

    beforeAll(() => {
      authorize(req, res, next);
    });

    it("should call next func once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.objectContaining({ status: 401 }));
    });
  });

  describe("when user provided invalid jwt-token", () => {
    let req = { headers: { authorization: "Bearer invalid_token" } };
    let res = null;
    let next = jest.fn();

    beforeAll(() => {
      authorize(req, res, next);
    });

    it("should call next func once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.objectContaining({ status: 401 }));
    });
  });

  describe("when everything is ok", () => {
    const userId = "hello_id";
    const token = jwt.sign({ sub: userId }, config.jwt.secret);
    let req = { headers: { authorization: `Bearer ${token}` } };
    let res = null;
    let next = jest.fn();

    beforeAll(() => {
      authorize(req, res, next);
    });

    it("should set req.userId", () => {
      expect(req.userId).toEqual(userId);
    });

    it("should call next func once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
