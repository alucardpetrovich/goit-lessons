const { UsersServer } = require("../8_auth_basics/src/server");
const {
  UserModel,
} = require("../8_auth_basics/src/resources/users/user.model");
const request = require("supertest");

describe("Sign Up Test Suite", () => {
  let server;

  beforeAll(async () => {
    server = new UsersServer();
    await server.startForTests();
  });

  describe("when validation fails", () => {
    it("should throw 400 error", async () => {
      await request(server.app).post("/api/auth/sign-up").send({}).expect(400);
    });
  });

  describe("when user with such email already exists", () => {
    let existingUser;

    beforeAll(async () => {
      existingUser = await UserModel.create({
        email: "test_conflict@email.com",
        username: "test",
        passwordHash: "test",
      });
    });

    afterAll(async () => {
      await UserModel.deleteOne({ _id: existingUser._id });
    });

    it("should return 409 error", async () => {
      await request(server.app)
        .post("/api/auth/sign-up")
        .send({
          email: existingUser.email,
          username: "test_username",
          password: "qwertydfgdf",
        })
        .expect(409);
    });
  });

  describe("when everything is ok", () => {
    let response;
    const email = "new_email@email.com";
    const reqBody = {
      email: email,
      username: "test_username",
      password: "qwertydfgdf",
    };
    let userCreated;

    beforeAll(async () => {
      response = await request(server.app).post("/api/auth/sign-up").send({
        email: email,
        username: "test_username",
        password: "qwertydfgdf",
      });

      userCreated = await UserModel.findOne({ email });
    });

    afterAll(async () => {
      await UserModel.deleteOne({ email });
    });

    it("should return 201", () => {
      expect(response.statusCode).toEqual(201);
    });

    it("should create user in DB", () => {
      expect(userCreated).toMatchObject({
        email: reqBody.email,
        username: reqBody.username,
      });
    });

    it("should return valid response body", () => {
      expect(response.body).toEqual({
        user: {
          id: userCreated._id.toString(),
          username: reqBody.username,
          email: reqBody.email,
        },
      });
    });
  });
});
