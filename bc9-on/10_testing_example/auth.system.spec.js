const { AuthServer } = require("../7_auth_example/src/server");
const supertest = require("supertest");
const { UserModel } = require("../7_auth_example/src/users/user.model");

describe("Auth controller system test suite", () => {
  let request;

  beforeAll(async () => {
    const server = new AuthServer();
    await server.start();

    request = supertest(server.app);
  });

  describe("When validation fails", () => {
    it("Should throw 400 error", async () => {
      await request
        .post("/auth/sign-up")
        .send({ email: "email@email.com" })
        .expect(400);
    });
  });

  describe("When user with such email already exists", () => {
    const email = "email@email.com";
    let user;

    beforeAll(async () => {
      user = await UserModel.createUser({
        displayName: "test",
        email,
        passwordHash: "test",
      });
    });

    afterAll(async () => {
      await UserModel.destroy({ where: { id: user.id } });
    });

    it("should throw 409 error", async () => {
      await request
        .post("/auth/sign-up")
        .send({
          displayName: "asdfs",
          email: "email@email.com",
          password: "test",
        })
        .expect(409);
    });
  });

  describe("When everything is ok", () => {
    let userCreated;
    let res;
    const reqBody = {
      displayName: "asdfs",
      email: "email@email.com",
      password: "test",
    };

    beforeAll(async () => {
      res = await request.post("/auth/sign-up").send(reqBody);

      userCreated = await UserModel.findUser({ email: reqBody.email });
    });

    afterAll(async () => {
      await UserModel.destroy({ where: { email: reqBody.email } });
    });

    it("Should return 201 status code", () => {
      expect(res.status).toEqual(201);
    });

    it("Should create new user", () => {
      expect(userCreated).toMatchObject({
        displayName: reqBody.displayName,
        email: reqBody.email,
      });
    });

    it("Should return expected response body", () => {
      const expectedBody = {
        id: userCreated.id,
        email: reqBody.email,
        displayName: reqBody.displayName,
      };

      expect(res.body).toEqual(expectedBody);
    });
  });
});
