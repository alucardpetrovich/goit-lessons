const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { authorize } = require("../7_auth_example/src/helpers/authorize");
const { UserModel } = require("../7_auth_example/src/users/user.model");

describe("Auth middleware unit test suite", () => {
  const secret = "hello_world";

  beforeAll(() => {
    process.env.JWT_SECRET = secret;
  });

  describe("when auth header was not provided", () => {
    const req = { headers: {} };
    const res = {};
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

    it("should call next", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when auth token is not valid", () => {
    const req = { headers: { authorization: "Bearer invalid_token" } };
    const res = {};
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

    it("should call next", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when user was not found by id", () => {
    const userId = 1;
    const token = jwt.sign({ uid: userId }, secret);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockImplementation();

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should call UserModel.findById once", () => {
      expect(UserModel.findById).toBeCalledTimes(1);
      expect(UserModel.findById).toBeCalledWith(userId);
    });

    it("should call next", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expect.any(Unauthorized));
    });
  });

  describe("when everything ok", () => {
    const userId = 1;
    const user = { _id: userId };
    const token = jwt.sign({ uid: userId }, secret);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    beforeAll(async () => {
      jest.spyOn(UserModel, "findById").mockResolvedValue(user);

      await authorize(req, res, next);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should call UserModel.findById once", () => {
      expect(UserModel.findById).toBeCalledTimes(1);
      expect(UserModel.findById).toBeCalledWith(userId);
    });

    it("should write user to req.user", () => {
      expect(req.user).toEqual(user);
    });

    it("should call next", () => {
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith();
    });
  });
});
