require = require("esm")(module);
const { AuthServer } = require("../auth_example/api/server");
const { config } = require("../auth_example/api/config");
const request = require("supertest-promised");
const sinon = require("sinon");
const {
  passportStrategies
} = require("../auth_example/api/auth/passport.strategies");
const passport = require("passport");
const { userModel } = require("../auth_example/api/user/user.model");
const { sessionModel } = require("../auth_example/api/session/session.model");
const { authController } = require("../auth_example/api/auth/auth.controller");
const should = require("should");

describe("Test module name", () => {
  let authServer;
  let server;
  let sandbox;
  let firstUser = {
    email: "user1@email.com",
    password: "qwerty",
    username: "User1"
  };
  let firstUserRecord;

  before(async () => {
    console.log("before hook");
    sandbox = sinon.createSandbox();

    sandbox.stub(passportStrategies, "initGoogleOAuthStrategy");
    const passportAuthenticateStub = sandbox
      .stub(passport, "authenticate")
      .withArgs("google")
      .callsFake((req, res, next) => {
        next();
      });

    passportAuthenticateStub.callThrough();

    authServer = new AuthServer(config);
    server = await authServer.start();
  });

  beforeEach(async () => {
    const passwordHash = await authController.createHash(firstUser.password);

    firstUserRecord = await userModel.create({
      username: firstUser.username,
      email: firstUser.email,
      passwordHash
    });
    console.log("before each hook");
  });

  afterEach(async () => {
    await userModel.deleteMany();
    await sessionModel.deleteMany();
    console.log("after each hook");
  });

  after(() => {
    server.close();
    console.log("after hook");
    sandbox.restore();
  });

  it("Some test here", () => {
    console.log("first test");
  });

  it("Second test", () => {
    console.log("second test");
  });

  it("Should return 400", async () => {
    await request(server)
      .post("/api/auth/sign-in/plain")
      .set("Content-Type", "application/json")
      .expect(400)
      .send({
        email: "some_email@email.com"
      })
      .end();
  });

  it("Should return 401", async () => {
    await request(server)
      .post("/api/auth/sign-in/plain")
      .set("Content-Type", "application/json")
      .expect(401)
      .send({
        email: "non_existent@email.com",
        password: "non_existent_password"
      })
      .end();
  });

  it("Should return 201", async () => {
    const responseBody = await request(server)
      .post("/api/auth/sign-in/plain")
      .set("Content-Type", "application/json")
      .expect(201)
      .send({
        email: firstUser.email,
        password: firstUser.password
      })
      .end()
      .get("body");

    responseBody.should.have.property("token").which.is.a.String();

    const createdSession = await sessionModel.findOne({
      userId: firstUserRecord._id
    });
    should.exist(createdSession);
  });
});
