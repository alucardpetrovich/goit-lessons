require = require("esm")(module);
const jwt = require("jsonwebtoken");
const { authorize } = require("../7_auth_example/src/helpers/authorize");
process.env.JWT_SECRET = "test_secret";

describe("Auth middleware test suite", () => {
  describe("when auth token is not provided in cookies", () => {
    const req = { signedCookies: {} };
    const res = {};
    const next = jest.fn();
    let actualResult;

    beforeAll(() => {
      try {
        authorize(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("Should call next once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.anything());
    });
  });

  describe("when auth token is not valid jwt", () => {
    const req = { signedCookies: { token: "invalid_token" } };
    const res = {};
    const next = jest.fn();

    beforeAll(() => {
      try {
        authorize(req, res, next);
      } catch (err) {}
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("Should call next once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.anything());
    });
  });

  describe("when auth token is valid jwt", () => {
    const tokenPayload = { uid: "user_id" };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    const req = { signedCookies: { token } };
    const res = {};
    const next = jest.fn();
    let actualResult;

    beforeAll(() => {
      try {
        authorize(req, res, next);
      } catch (err) {
        actualResult = err;
      }
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should write to req.userId", () => {
      expect(req.userId).toEqual(tokenPayload.uid);
    });

    it("Should call next once", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
