const supertest = require("supertest");
const AuthServer = require("../9_auth_example/src/server");
const { UserModel } = require("../9_auth_example/src/users/user.model");

describe("Auth Router Test Suite", () => {
  // 1. start server
  // 2. init test data (fixtures) if needed
  // 3. run test
  // 4. clear fixtures and data created by test
  let app;

  beforeAll(async () => {
    const authServer = await new AuthServer().startForTest();
    app = authServer.app;
  });

  describe("POST /auth/sign-up", () => {
    let response;
    let createdUser;

    const reqBody = {
      username: "hello user",
      email: "testUser@email.com",
      password: "qwerty",
    };

    beforeAll(async () => {
      response = await supertest(app).post("/auth/sign-up").send(reqBody);

      createdUser = await UserModel.findById(response.body.id);
    });

    afterAll(async () => {
      await UserModel.deleteOne({ _id: createdUser._id });
    });

    it("should return 201 status code", () => {
      expect(response.statusCode).toEqual(201);
    });

    it("should create new user", () => {
      expect(createdUser).toBeTruthy();
    });

    it("should return expected result", () => {
      expect(response.body).toEqual({
        id: createdUser._id.toString(),
        username: reqBody.username,
        email: reqBody.email,
      });
    });
  });
});
