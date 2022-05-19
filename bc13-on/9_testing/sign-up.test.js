const supertest = require("supertest");
const { AuthServer } = require("../7_auth_basics/src/server");
const {
  UserModel,
} = require("../7_auth_basics/src/resources/users/users.model");

describe("Sign-up API tests", () => {
  let server;
  let request;

  beforeAll(async () => {
    server = new AuthServer();
    await server.start();
    request = supertest(server.getApp());
  });

  afterAll(() => {
    server.close();
  });

  describe("when validation fails", () => {
    it("should throw 400 error", async () => {
      await request.post("/api/v1/auth/sign-up").send({}).expect(400);
    });
  });

  describe("when user with such email already exists", () => {
    const email = "existing_email@gmail.com";

    beforeAll(async () => {
      await UserModel.create({
        username: "test user",
        email,
        passwordHash: "test_password_hash",
      });
    });

    afterAll(async () => {
      await UserModel.deleteOne({ email });
    });

    it("should throw 409 error", async () => {
      await request
        .post("/api/v1/auth/sign-up")
        .send({
          email,
          username: "test user 2",
          password: "test password",
        })
        .expect(409);
    });
  });

  describe("when everything is ok", () => {
    const reqBody = {
      username: "test",
      email: "successful_test@gmail.com",
      password: "test",
    };
    let userCreated;
    let response;

    beforeAll(async () => {
      response = await request.post("/api/v1/auth/sign-up").send(reqBody);

      userCreated = await UserModel.findOne({ email: reqBody.email });
    });

    afterAll(async () => {
      await UserModel.deleteOne({ _id: userCreated._id });
    });

    it("should return 201", () => {
      expect(response.status).toEqual(201);
    });

    it("should create new user", () => {
      expect(userCreated).toMatchObject({
        username: reqBody.username,
        email: reqBody.email,
      });
    });

    it("should return expected response body", () => {
      const expectedResBody = {
        user: {
          id: userCreated._id.toString(),
          username: reqBody.username,
          email: reqBody.email,
        },
      };

      expect(response.body).toEqual(expectedResBody);
    });
  });
});
