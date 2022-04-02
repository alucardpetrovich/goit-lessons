const {
  authorize,
} = require("../8_auth_basics/src/middlewares/authorize.middleware");
const { Unauthorized, Forbidden } = require("http-errors");
const jwt = require("jsonwebtoken");

const conf = { jwt: { secret: "secret" } };
jest.mock("../8_auth_basics/src/config", () => ({
  getConfig: () => conf,
}));

describe("Auth middleware Test Suite", () => {
  describe("when token was not present", () => {
    const middleware = authorize();
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

    let actualResult;

    beforeAll(() => {
      try {
        middleware(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw Unauthorized error", () => {
      expect(actualResult).toBeInstanceOf(Unauthorized);
    });

    it("should not call next", () => {
      expect(next).not.toBeCalled();
    });
  });

  describe("when provided token is invalid", () => {
    const middleware = authorize();
    const req = { headers: { authorization: "Bearer adsfasgfdgdfg" } };
    const res = {};
    const next = jest.fn();

    let actualResult;

    beforeAll(() => {
      try {
        middleware(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw Unauthorized error", () => {
      expect(actualResult).toBeInstanceOf(Unauthorized);
    });

    it("should not call next", () => {
      expect(next).not.toBeCalled();
    });
  });

  describe("when user does not have required permissions", () => {
    const middleware = authorize("users.create");
    const res = {};
    const next = jest.fn();
    const token = jwt.sign({ permissions: [] }, conf.jwt.secret);
    const req = { headers: { authorization: `Bearer ${token}` } };

    let actualResult;

    beforeAll(() => {
      try {
        middleware(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw Forbidden error", () => {
      expect(actualResult).toBeInstanceOf(Forbidden);
    });

    it("should not call next", () => {
      expect(next).not.toBeCalled();
    });
  });

  describe("when everything is ok", () => {
    const perm = "users.create";
    const uid = "user_id";
    const middleware = authorize(perm);
    const res = {};
    const next = jest.fn();
    const token = jwt.sign({ permissions: [perm], uid }, conf.jwt.secret);
    const req = { headers: { authorization: `Bearer ${token}` } };

    let actualResult;

    beforeAll(() => {
      try {
        middleware(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should not throw error", () => {
      expect(actualResult).toBeUndefined();
    });

    it("should set req.userId", () => {
      expect(req.userId).toEqual(uid);
    });

    it("should call next once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
