const AuthServer = require("../7_auth_example/src/server");
const request = require("supertest");
const { assert, expect } = require("chai");
const { User } = require("../7_auth_example/src/users/user.model");

describe("Auth test suite", () => {
  let server;

  before(async () => {
    const authServer = new AuthServer();
    await authServer.start();
    server = authServer.server;
  });

  after(() => {
    server.close();
  });

  describe("POST /auth/sign-up", () => {
    context("when req body is invalid", () => {
      let response;

      before(async () => {
        response = await request(server)
          .post("/auth/sign-up")
          .send({ name: "smth" });
      });

      it("should throw 400 error", () => {
        assert.equal(response.status, 400);
      });
    });

    context("when everything is ok", () => {
      let response;
      let reqBody = {
        username: "user1",
        email: "valid@email.com",
        password: "qwerty",
      };

      before(async () => {
        response = await request(server).post("/auth/sign-up").send(reqBody);
      });

      after(async () => {
        await User.deleteOne({ email: reqBody.email });
      });

      it("should return response with 201", () => {
        assert.equal(response.status, 201);
      });

      it("should create user in DB", async () => {
        const userFromDB = await User.findOne({ email: reqBody.email });
        assert.exists(userFromDB);
      });

      it("should return expected response body", () => {
        expect(response.body).to.include({
          email: reqBody.email,
          username: reqBody.username,
        });
        expect(response.body).to.not.have.key("password");
        assert.containsAllKeys(response.body, "id");
      });
    });
  });
});
