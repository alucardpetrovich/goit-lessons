const request = require("supertest");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthServer } = require("../7_auth_basics/src/server");
const {
  UserModel,
} = require("../7_auth_basics/src/resources/users/users.model");

describe("Auth controller Test Suite", () => {
  let authServer;
  let user;
  const password = "jUsTTest";

  beforeAll(async () => {
    authServer = new AuthServer();
    await authServer.startForTests();

    user = await UserModel.create({
      username: "test11",
      email: "test@email.com",
      passwordHash: await bcryptjs.hash(password, 5),
    });
  });

  afterAll(async () => {
    await authServer.getServer().close();
    await UserModel.deleteOne({ _id: user._id });
  });

  describe("when validation fails", () => {
    it("should throw 400 error", async () => {
      await request(authServer.getApp())
        .post("/api/v1/auth/sign-in")
        .send({})
        .expect(400);
    });
  });

  describe("when user with such email does not exist", () => {
    it("should throw 422 error", async () => {
      await request(authServer.getApp())
        .post("/api/v1/auth/sign-in")
        .send({ email: "non_existent@email.com", password: "asdfasdf" })
        .expect(422);
    });
  });

  describe("when client provided wrong password", () => {
    it("should throw 422 error", async () => {
      await request(authServer.getApp())
        .post("/api/v1/auth/sign-in")
        .send({ email: user.email, password: "wrong_password" })
        .expect(422);
    });
  });

  describe("when everything is ok", () => {
    let response;

    beforeAll(async () => {
      response = await request(authServer.getApp())
        .post("/api/v1/auth/sign-in")
        .send({ email: user.email, password });
    });

    it("should return 201 status code", () => {
      expect(response.statusCode).toEqual(201);
    });

    it("should send expected response body", () => {
      const expectedUser = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      };

      expect(response.body).toBeTruthy();
      expect(response.body.user).toEqual(expectedUser);
      expect(response.body.token).toBeTruthy();
    });

    it("should set correct JWT payload", () => {
      const payload = jwt.decode(response.body.token);
      expect(payload.userId).toEqual(user._id.toString());
    });
  });
});
