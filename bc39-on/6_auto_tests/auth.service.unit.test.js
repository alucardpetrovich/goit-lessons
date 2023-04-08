const bcryptjs = require("bcryptjs");
const {
  authService,
} = require("../3_auth_example/src/modules/auth/auth.service");
const { UserModel } = require("../3_auth_example/src/modules/users/user.model");

describe("Auth Service test suite", () => {
  describe("#signUp", () => {
    describe("when user with such phoneNumber already exists", () => {
      const existingUser = { id: "213234" };
      const userParams = {
        username: "test",
        phoneNumber: "+1231231212",
        password: "qwerty",
      };
      let actualResult;

      beforeAll(async () => {
        jest.spyOn(UserModel, "findOne").mockResolvedValue(existingUser);
        jest.spyOn(UserModel, "create").mockImplementation();
        jest.spyOn(bcryptjs, "hash").mockImplementation();

        try {
          await authService.signUp(userParams);
        } catch (err) {
          actualResult = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("should call UserModel.findOne once", () => {
        expect(UserModel.findOne).toBeCalledTimes(1);
        expect(UserModel.findOne).toBeCalledWith({
          phoneNumber: userParams.phoneNumber,
        });
      });

      it("should not call bcryptjs.hash", () => {
        expect(bcryptjs.hash).not.toBeCalled();
      });

      it("should not call UserModel.create", () => {
        expect(UserModel.create).not.toBeCalled();
      });

      it("should throw Conflict error", () => {
        expect(actualResult.status).toEqual(409);
      });
    });

    describe("when method creates new user", () => {
      const userParams = {
        username: "test",
        phoneNumber: "+1231231212",
        password: "qwerty",
      };
      const passwordHash = "password_hash";
      const newUser = { id: "asdfasdf" };
      let actualResult;

      beforeAll(async () => {
        jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
        jest.spyOn(UserModel, "create").mockResolvedValue(newUser);
        jest.spyOn(bcryptjs, "hash").mockResolvedValue(passwordHash);

        actualResult = await authService.signUp(userParams);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("should call UserModel.findOne once", () => {
        expect(UserModel.findOne).toBeCalledTimes(1);
        expect(UserModel.findOne).toBeCalledWith({
          phoneNumber: userParams.phoneNumber,
        });
      });

      it("should call bcryptjs.hash once", () => {
        expect(bcryptjs.hash).toBeCalledTimes(1);
        expect(bcryptjs.hash).toBeCalledWith(
          userParams.password,
          parseInt(process.env.BCRYPT_COST_FACTOR)
        );
      });

      it("should call UserModel.create once", () => {
        expect(UserModel.create).toBeCalledTimes(1);
        expect(UserModel.create).toBeCalledWith({
          phoneNumber: userParams.phoneNumber,
          username: userParams.username,
          passwordHash,
        });
      });

      it("should return expected result", () => {
        expect(actualResult).toEqual(newUser);
      });
    });
  });
});
