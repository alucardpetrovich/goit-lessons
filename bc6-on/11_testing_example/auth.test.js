const { before } = require("mocha");
const request = require("supertest");
const { expect } = require("chai");
const { CrudServer } = require("../8_auth_example/src/server");
const { UserModel } = require("../8_auth_example/src/users/user.model");

describe("Auth Controller Test Suite", () => {
  let server;

  before(async () => {
    const crudServer = new CrudServer();
    await crudServer.startForTest();
    server = crudServer.server;
  });

  describe("POST /auth/sign-up", () => {
    context("when validation fails", () => {
      it("should return 400 error", async () => {
        await request(server)
          .post("/auth/sign-up")
          .send({ username: "test" })
          .expect(400);
      });
    });

    context("when user with such email already exists", () => {
      let email = `test${Date.now()}@email.com`;

      before(async () => {
        await UserModel.create({
          email,
          username: "test1",
          passwordHash: "passwordHash",
        });
      });

      after(async () => {
        await UserModel.deleteOne({ email });
      });

      it("should return 409 error", async () => {
        await request(server)
          .post("/auth/sign-up")
          .send({
            username: "test",
            email,
            password: "qwerty",
          })
          .expect(409);
      });
    });

    context("when user with such email already exists", () => {
      let email = `test${Date.now()}@email.com`;
      let result;
      let newUser;

      const requestBody = {
        username: "test",
        email,
        password: "qwerty",
      };

      before(async () => {
        result = await request(server).post("/auth/sign-up").send(requestBody);

        newUser = await UserModel.findOne({ email });
      });

      after(async () => {
        await UserModel.deleteOne({ email });
      });

      it("should return 201", async () => {
        expect(result.status).to.eql(201);
      });

      it("should create new user in DB", () => {
        expect(newUser).exist;
        expect(newUser.username).to.eql(requestBody.username);
        expect(newUser.email).to.eql(requestBody.email);
        expect(typeof newUser.passwordHash).to.eql("string");
      });

      it("should expected response body", () => {
        const expectedResponse = {
          id: newUser._id.toString(),
          username: requestBody.username,
          email: requestBody.email,
        };

        expect(expectedResponse).to.eql(result.body);
      });
    });
  });
});
