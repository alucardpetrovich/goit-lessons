const supertest = require("supertest");
const { AuthServer } = require("../7_auth_example/src/server");
const { UserModel } = require("../7_auth_example/src/users/user.model");

describe("Auth acceptance test suite", () => {
  let request;
  let app;

  beforeAll(async () => {
    const authServer = new AuthServer();
    await authServer.startForTest();
    const app = authServer.app;
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
  });

  describe("POST /api/auth/sign-up", () => {
    describe("when client sends invalid body", () => {
      it("should throw 400", async () => {
        await request.post("/api/auth/sign-up").send({}).expect(400);
      });
    });

    describe("when user with such email already exists", () => {
      const email = `test${Date.now()}@email.com`;

      beforeAll(async () => {
        await UserModel.create({
          email,
          username: "hello",
          passwordHash: "hello",
        });
      });

      afterAll(async () => {
        await UserModel.deleteMany({ email });
      });

      it("should create new user", async () => {
        await request
          .post("/api/auth/sign-up")
          .send({
            email,
            username: "test",
            password: "test",
          })
          .expect(409);
      });
    });

    describe("when everything ok", () => {
      const email = `test${Date.now()}@email.com`;

      afterAll(async () => {
        await UserModel.deleteMany({ email });
      });

      it("should throw 409", async () => {
        const requestBody = {
          email,
          username: "test",
          password: "test",
        };

        const response = await request
          .post("/api/auth/sign-up")
          .send(requestBody)
          .expect(201);

        const createdUser = await UserModel.findOne({ email });

        expect(createdUser).toBeTruthy();
        expect(response.body).toEqual({
          id: createdUser._id.toString(),
          username: requestBody.username,
          email,
        });
      });
    });
  });
});
