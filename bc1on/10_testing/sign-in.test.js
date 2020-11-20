const { AuthServer } = require("../7_auth_example/src/server");
const { UserModel } = require("../7_auth_example/src/users/user.model");
const bcryptjs = require("bcryptjs");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");

describe("Sign In test suite", () => {
  let app;

  before(async () => {
    const authServer = new AuthServer();
    await authServer.startForTests();
    app = authServer.app;
  });

  context("when everything ok", () => {
    let user;
    let password;
    let response;

    before(async () => {
      password = "qwerty";
      user = await UserModel.create({
        username: "hello",
        email: "test@email.com",
        passwordHash: await bcryptjs.hash(password, 5),
      });

      response = await request(app).post("/auth/sign-in").send({
        email: user.email,
        password: password,
      });
    });

    after(async () => {
      await UserModel.deleteOne({ _id: user._id });
    });

    it("should return 200 OK", () => {
      expect(response.status).to.be.equal(200);
    });

    it("should add token to user document", async () => {
      const updatedUser = await UserModel.findById(user._id);
      const [token] = updatedUser.tokens;
      expect(token).to.exist;
    });

    it("should return expected response body", () => {
      expect(response.body).to.exist;
      expect(response.body.user).to.deep.equal({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      });
      expect(typeof response.body.token).to.equal("string");
    });

    it("should return valid jwt token", () => {
      const payload = jwt.decode(response.body.token);
      expect(payload.userId).to.equal(user._id.toString());
    });
  });
});
