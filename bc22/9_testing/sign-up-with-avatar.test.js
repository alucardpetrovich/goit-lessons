const supertest = require("supertest");
const { server } = require("../8_statics_example/multer_example");
const { promises: fsPromises } = require('fs');

describe("Sign-up with avatar Test Suite", () => {
  let request;
  let response;

  beforeAll(async () => {
    request = supertest(server);

    response = await request
      .post("/sign-up")
      .field("username", "user1")
      .field("password", "qwerty")
      .attach("avatar", "1603529226139.jpg");
  });

  afterAll(async () => {
    await fsPromises.unlink(response.body.localPath);
  });

  it("should return 200", () => {
    expect(response.status).toEqual(200);
  });

  it("should save file", async () => {
    const localPath = response.body.localPath;
    await fsPromises.lstat(localPath);
  });
});
