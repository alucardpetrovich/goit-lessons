const {
  authorizeWithAuthorizationHeader,
} = require("../7_auth_basics/src/shared/middlewares/authorize");
const jwt = require("jsonwebtoken");

const secret = "test_secret";
jest.mock("../7_auth_basics/src/config", () => ({
  getConfig: () => ({
    jwt: { secret },
  }),
}));

describe("Authorize middleware Test Suite", () => {
  describe("when token was not provided", () => {
    const req = { headers: {} };
    const res = null;
    const next = jest.fn();

    beforeAll(() => {
      authorizeWithAuthorizationHeader()(req, res, next);
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("should not set req.userId", () => {
      expect(req.userId).toBeFalsy();
    });
  });

  describe("when token was not provided", () => {
    const token = "wrong_token";
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = null;
    const next = jest.fn();

    beforeAll(() => {
      authorizeWithAuthorizationHeader()(req, res, next);
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("should not set req.userId", () => {
      expect(req.userId).toBeFalsy();
    });
  });

  describe("when everything is ok", () => {
    const userId = 1;
    const token = jwt.sign({ userId }, secret);

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = null;
    const next = jest.fn();

    beforeAll(() => {
      authorizeWithAuthorizationHeader()(req, res, next);
    });

    it("should not set req.userId", () => {
      expect(req.userId).toEqual(userId);
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
