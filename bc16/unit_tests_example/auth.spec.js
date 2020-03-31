require = require("esm")(module);
const { AuthServer } = require("../auth_example/api/server");
const { config } = require("../auth_example/api/config");
const request = require("supertest-promised");
const sinon = require("sinon");

describe("Test module name", () => {
  let authServer;
  let server;
  let sandbox;

  before(async () => {
    // console.log("before hook");
    authServer = new AuthServer(config);
    server = await authServer.start();
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    console.log("before each hook");
  });

  afterEach(() => {
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
});
