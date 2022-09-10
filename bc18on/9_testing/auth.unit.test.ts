import { UserModel } from "../7_auth_example/src/resources/users/user.model";
import { authService } from "../7_auth_example/src/resources/auth/auth.service";
import { SignInDto } from "../7_auth_example/src/resources/auth/auth.schemas";
import { NotFound, Forbidden } from "http-errors";
import * as bcryptjs from "bcryptjs";

describe("Auth resourse test suite", () => {
  describe("#signIn", () => {
    const dto: SignInDto = { email: "test@email.com", password: "qwerty" };

    describe("when user was not found", () => {
      let actualResult: any;

      beforeAll(async () => {
        jest.spyOn(UserModel, "findOne").mockImplementation();

        try {
          await authService.signIn(dto);
        } catch (err) {
          actualResult = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("should call UserModel.findOne", () => {
        expect(UserModel.findOne).toBeCalledTimes(1);
        expect(UserModel.findOne).toBeCalledWith({ email: dto.email });
      });

      it("should throw NotFound error", () => {
        expect(actualResult.status).toEqual(404);
      });
    });

    describe("when password is wrong", () => {
      let actualResult: any;

      beforeAll(async () => {
        jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
          passwordHash: await bcryptjs.hash("wrong_hash", 1),
        });

        try {
          await authService.signIn(dto);
        } catch (err) {
          actualResult = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("should call UserModel.findOne", () => {
        expect(UserModel.findOne).toBeCalledTimes(1);
        expect(UserModel.findOne).toBeCalledWith({ email: dto.email });
      });

      it("should throw NotFound error", () => {
        expect(actualResult.status).toEqual(403);
      });
    });

    describe("when everything is ok", () => {
      let actualResult: any;
      let user: any;

      beforeAll(async () => {
        user = {
          _id: "test",
          passwordHash: await bcryptjs.hash(dto.password, 1),
        };
        jest.spyOn(UserModel, "findOne").mockResolvedValueOnce(user);

        actualResult = await authService.signIn(dto);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("should call UserModel.findOne", () => {
        expect(UserModel.findOne).toBeCalledTimes(1);
        expect(UserModel.findOne).toBeCalledWith({ email: dto.email });
      });

      it("should throw NotFound error", () => {
        expect(typeof actualResult).toEqual("object");
        expect(actualResult.user).toEqual(user);
        expect(typeof actualResult.token).toEqual("string");
      });
    });
  });
});
