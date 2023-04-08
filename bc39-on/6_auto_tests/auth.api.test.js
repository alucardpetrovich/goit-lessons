const supertest = require("supertest");
const { UserModel } = require("../3_auth_example/src/modules/users/user.model");
const { AuthServer } = require("../3_auth_example/src/server");

describe("Auth API test suite", () => {
  let app;

  beforeAll(async () => {
    const authServer = new AuthServer();
    await authServer.startForTest();
    app = authServer.getApp();
  });

  describe("POST /api/auth/sign-up", () => {
    describe("when request body is wrong", () => {
      it("should throw 400 error", async () => {
        await supertest(app)
          .post("/api/auth/sign-up")
          .set("Content-Type", "application/json")
          .send({ username: "test user" })
          .expect(400);
      });
    });

    describe("when such user already exists", () => {
      let existingUser;

      beforeAll(async () => {
        existingUser = await UserModel.create({
          username: "test",
          phoneNumber: "+1231231212",
          passwordHash: "passwordHash",
        });
      });

      afterAll(async () => {
        await UserModel.deleteOne({ _id: existingUser._id });
      });

      it("should throw 409 error", async () => {
        await supertest(app)
          .post("/api/auth/sign-up")
          .set("Content-Type", "application/json")
          .send({
            username: "test user",
            phoneNumber: existingUser.phoneNumber,
            password: "Qwerty12!",
          })
          .expect(409);
      });
    });

    describe("when such user already exists", () => {
      const requestBody = {
        username: "test user",
        phoneNumber: "+4534534534213412",
        password: "Qwerty12!",
      };
      let result;
      let newUser;

      beforeAll(async () => {
        result = await supertest(app)
          .post("/api/auth/sign-up")
          .set("Content-Type", "application/json")
          .send(requestBody);

        newUser = await UserModel.findById(result.body.user.id);
      });

      afterAll(async () => {
        await UserModel.deleteOne({ _id: newUser._id });
      });

      it("should return 201", async () => {
        expect(result.statusCode).toEqual(201);
      });

      it("should create new user", () => {
        expect(newUser).toMatchObject({
          username: requestBody.username,
          phoneNumber: requestBody.phoneNumber,
        });
      });

      it("should return expected response body", () => {
        const expectedBody = {
          user: {
            id: newUser._id.toString(),
            username: requestBody.username,
            phoneNumber: requestBody.phoneNumber,
          },
        };

        expect(result.body).toEqual(expectedBody);
      });
    });
  });
});
