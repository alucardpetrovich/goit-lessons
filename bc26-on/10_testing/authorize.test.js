const {
  authorize,
} = require("../../bc25/7_auth_example/src/helpers/authorize");
const { UserModel } = require("../../bc25/7_auth_example/src/users/user.model");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

describe("Authorize middleware unit test suite", () => {
  const secret = "test_secret";
  process.env.JWT_SECRET = secret;

  describe("when authorization header was not provided", () => {
    const req = { headers: {} };
    const res = null;
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockImplementation();

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should not call UserModel.findById", () => {
      expect(UserModel.findById).not.toBeCalled();
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when provided token is not valid JWT", () => {
    const req = { headers: { authorization: "Bearer asdfasdf" } };
    const res = null;
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockImplementation();

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should not call UserModel.findById", () => {
      expect(UserModel.findById).not.toBeCalled();
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when user was not found", () => {
    const uid = "test";
    const token = jwt.sign({ uid }, secret);

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = null;
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockResolvedValueOnce(null);

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should call UserModel.findById once", () => {
      expect(UserModel.findById).toBeCalledTimes(1);
      expect(UserModel.findById).toBeCalledWith(uid);
    });

    it("should call next with error", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when everything is ok", () => {
    const uid = "test";
    const token = jwt.sign({ uid }, secret);
    const user = { id: "test" };

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = null;
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockResolvedValueOnce(user);

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should call UserModel.findById once", () => {
      expect(UserModel.findById).toBeCalledTimes(1);
      expect(UserModel.findById).toBeCalledWith(uid);
    });

    it('should set req.user value', () => {
      expect(req.user).toEqual(user);
    });

    it("should call next without args", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
