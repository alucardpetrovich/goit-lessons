const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const { AuthServer } = require("../../bc25/7_auth_example/src/server");
const { UserModel } = require("../../bc25/7_auth_example/src/users/user.model");

describe("auth controller API test suite", () => {
  let app;
  let request;
  let user;
  let password = "test_password";

  beforeAll(async () => {
    const authServer = new AuthServer();
    await authServer.startForTest();

    app = authServer.app;
    request = supertest(app);

    user = await UserModel.create({
      username: "hello",
      email: "bc26on@email.com",
      passwordHash: await bcrypt.hash(password, 5),
    });
  });

  afterAll(async () => {
    await UserModel.deleteOne({ _id: user._id });
  });

  describe("when validation failed", () => {
    it("should throw 400 error", async () => {
      await supertest(app).post("/api/auth/sign-in").send().expect(400);
    });
  });

  describe("when user was not found", () => {
    const reqBody = {
      email: "non_existent@email.com",
      password: "asdfasdfdsa",
    };

    it("should throw 404 error", async () => {
      await supertest(app).post("/api/auth/sign-in").send(reqBody).expect(404);
    });
  });

  describe("when user provided wrong password", () => {
    let reqBody;

    beforeAll(() => {
      reqBody = { email: user.email, password: "wrong_password" };
    });

    it("should throw 403 error", async () => {
      await supertest(app).post("/api/auth/sign-in").send(reqBody).expect(403);
    });
  });

  describe("when everything is ok", () => {
    let reqBody;
    let response;

    beforeAll(async () => {
      reqBody = { email: user.email, password: password };

      response = await supertest(app).post("/api/auth/sign-in").send(reqBody);
    });

    it("should return 201", async () => {
      expect(response.status).toEqual(201);
    });

    it("should return expected response body", () => {
      const expectedUser = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      };

      expect(response.body).toBeTruthy();
      expect(response.body.user).toEqual(expectedUser);
      expect(typeof response.body.token).toEqual("string");
    });
  });
});
