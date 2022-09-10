import supertest from "supertest";
import bcrypt from "bcryptjs";
import { SignInDto } from "../7_auth_example/src/resources/auth/auth.schemas";
import {
  User,
  UserModel,
} from "../7_auth_example/src/resources/users/user.model";
import { AuthServer } from "../7_auth_example/src/server";

describe("Auth resource API test suite", () => {
  let server: any;

  beforeAll(async () => {
    const authServer = new AuthServer();
    await authServer.startForTests();

    server = authServer["app"];
  });

  describe("POST /api/v1/auth/sign-in", () => {
    describe("when validation fails", () => {
      it("should throw 400 error", async () => {
        await supertest(server)
          .post("/api/v1/auth/sign-in")
          .send({})
          .expect(400);
      });
    });

    describe("when everything is ok", () => {
      const dto: SignInDto = {
        email: "test23432412321@email.com",
        password: "qwerty",
      };
      let user: User;
      let response: supertest.Response;

      beforeAll(async () => {
        user = await UserModel.create({
          username: "test",
          email: dto.email,
          passwordHash: await bcrypt.hash(dto.password, 1),
        });

        response = await supertest(server)
          .post("/api/v1/auth/sign-in")
          .send(dto);
      });

      afterAll(async () => {
        await UserModel.deleteOne({ _id: user._id });
      });

      it("should receive 201 status code", () => {
        expect(response.status).toEqual(201);
      });

      it("should return expected response body", () => {
        expect(response.body).toBeTruthy();
        expect(response.body.user).toEqual({
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        });
        expect(response.body.token).toBeTruthy();
      });
    });
  });
});
