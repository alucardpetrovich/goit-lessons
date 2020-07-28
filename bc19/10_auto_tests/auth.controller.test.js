const { default: context } = require("jest-plugin-context");

const AuthServer = require("../9_static_files_handling_example/src/server");
const {
  User,
} = require("../9_static_files_handling_example/src/users/user.model");
const supertest = require("supertest");

describe("Auth controller test suite", () => {
  let request;

  beforeAll(async () => {
    const authServer = new AuthServer();
    await authServer.startForTest();
    request = supertest(authServer.app);
  });

  describe("POST /sign-up", () => {
    context("when request body is not valid", () => {
      it("should return 400 error", async () => {
        await request.post("/auth/sign-up").send({}).expect(400);
      });
    });

    context("when request body does not contain avatar", () => {
      it("should return 400 error", async () => {
        await request
          .post("/auth/sign-up")
          .field("username", "hello")
          .field("email", "email@email.com")
          .field("password", "qwerty")
          .expect(400);
      });
    });

    context("when user with such email exists", () => {
      let user;
      const email = "existing@email.com";

      beforeAll(async () => {
        user = await User.create({
          username: "asdfasdf",
          email,
          passwordHash: "asdfsadf",
          avatarPath: "asdfasdf",
        });
      });

      afterAll(async () => {
        await User.deleteOne({ _id: user._id });
      });

      it("should return 409 error", async () => {
        await request
          .post("/auth/sign-up")
          .field("username", "hello")
          .field("email", email)
          .field("password", "qwerty")
          .attach("avatar", "503746.jpg")
          .expect(409);
      });
    });

    context("when everything is ok", () => {
      const username = "hello";
      const email = "new@email.com";

      afterAll(async () => {
        await User.deleteOne({ email });
      });

      it("should return 201 status code", async () => {
        const response = await request
          .post("/auth/sign-up")
          .field("username", username)
          .field("email", email)
          .field("password", "qwerty")
          .attach("avatar", "503746.jpg")
          .expect(201);

        const createdUser = await User.findOne({ email });
        expect(createdUser).toBeTruthy();

        expect(response.body.username).toEqual(username);
        expect(response.body.email).toEqual(email);
        expect(response.body.id).toEqual(createdUser._id.toString());
        expect(response.body).not.toHaveProperty("passwordHash");
        expect(response.body).toHaveProperty("avatarPath");
      });
    });

    // TDD - Test Driven Development
  });
});
