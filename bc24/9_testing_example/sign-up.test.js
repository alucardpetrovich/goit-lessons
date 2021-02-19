require = require("esm")(module);
const { expect } = require("chai");
const request = require("supertest");
const { AuthServer } = require("../7_auth_example/src/server.js");
const { userModel } = require("../7_auth_example/src/users/user.model.js");

describe("sign-up test suite", () => {
  let server;

  before(async () => {
    const authServer = new AuthServer();
    await authServer.startForTest();
    server = authServer.server;
  });

  // 1. check successful user registration flow
  context("when everything is ok", () => {
    let response;
    let createdUser;
    const requestBody = {
      username: "hello world",
      email: "test@email.com",
      password: "qwerty",
    };

    before(async () => {
      response = await request(server).post("/auth/sign-up").send(requestBody);

      createdUser = await userModel.findOne({ email: requestBody.email });
    });

    after(async () => {
      await userModel.deleteOne({ email: requestBody.email });
    });

    it("Should return 201 status", () => {
      expect(response.status).eql(201);
    });

    it("Should create user in DB", async () => {
      expect(createdUser).exist;
      expect(createdUser).contains({
        username: requestBody.username,
        email: requestBody.email,
      });
    });

    it("Should return expected response body", () => {
      expect(response.body).deep.equal({
        id: createdUser._id.toString(),
        username: requestBody.username,
        email: requestBody.email,
      });
    });
  });
});
