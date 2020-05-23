require = require("esm")(module);
const { CrudServer } = require("../7_authentication_authorization/api/server");
const {
  userModel,
} = require("../7_authentication_authorization/api/user/user.model");
const request = require("supertest");
const should = require("should");

describe("Register Acceptance Tests Suite", () => {
  let httpServer;

  before(async () => {
    const crudServer = new CrudServer();
    await crudServer.start();
    httpServer = crudServer.httpServer;
  });

  after(async () => {
    httpServer.close();
    await userModel.deleteMany();
  });

  context("when request body is not valid", () => {
    let response;

    before(async () => {
      response = await request(httpServer).post("/auth/register").send({});
    });

    it("should return 400 error", () => {
      response.status.should.be.eql(400);
    });
  });

  context("when user with provided email exists", () => {
    const existingEmail = "hello@email.com";

    before(async () => {
      await userModel.createUser({
        username: "existing",
        email: existingEmail,
        passwordHash: "hash",
      });

      response = await request(httpServer).post("/auth/register").send({
        username: "hello",
        email: existingEmail,
        password: "pass",
      });
    });

    after(async () => {
      await userModel.deleteMany({ email: existingEmail });
    });

    it("should return 409 error", () => {
      response.status.should.be.eql(409);
    });
  });

  context("when user with provided email does not exist", () => {
    const newUserEmail = "new@email.com";
    let newUser;

    before(async () => {
      response = await request(httpServer).post("/auth/register").send({
        username: "hello",
        email: newUserEmail,
        password: "pass",
      });

      newUser = await userModel.findOne({ email: newUserEmail });
    });

    after(async () => {
      await userModel.deleteMany({ email: newUserEmail });
    });

    it("should return 201 status code", () => {
      response.status.should.be.eql(201);
    });

    it("should create new user", () => {
      should.exist(newUser);
    });

    it("should return expected body", () => {
      response.body.should.be.eql({
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          username: newUser.username,
        },
      });
    });
  });
});
