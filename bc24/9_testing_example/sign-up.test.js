require = require("esm")(module);
// const supertest = require("supertest");
// const context = require("jest-plugin-context");
// const { AuthServer } = require("../7_auth_example/src/server.js");
// const { userModel } = require("../7_auth_example/src/users/user.model.js");

describe("sign-up test suite", () => {
  let server;

  beforeAll(async () => {
    // const authServer = new AuthServer();
    // await authServer.startForTest();
    // server = authServer.server;
  });

  it("should pass", () => {});

  // 1. check successful user registration flow
  // context("when everything is ok", () => {
  //   let response;
  //   let createdUser;
  //   const requestBody = {
  //     username: "hello world",
  //     email: "test@email.com",
  //     password: "qwerty",
  //   };

  //   beforeAll(async () => {
  //     response = await request(server).post("/auth/sign-up").send(requestBody);

  //     createdUser = await userModel.findOne({ email: requestBody.email });
  //   });

  //   afterAll(async () => {
  //     await userModel.deleteOne({ email: requestBody.email });
  //   });

  //   it("Should return 201 status", () => {
  //     expect(response.status).toEqual(201);
  //   });

  //   it("Should create user in DB", async () => {
  //     expect(createdUser).toBeTruthy();
  //     expect(createdUser).toContainEqual({
  //       username: requestBody.username,
  //       email: requestBody.email,
  //     });
  //   });

  //   it("Should return expected response body", () => {
  //     expect(response.body).toEqual({
  //       id: createdUser._id.toString(),
  //       username: requestBody.username,
  //       email: requestBody.email,
  //     });
  //   });
  // });
});
