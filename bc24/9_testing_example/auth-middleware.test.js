require = require("esm")(module);
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const { authorize } = require("../7_auth_example/src/helpers/authorize");
const {
  Unauthorized,
} = require("../7_auth_example/src/helpers/error.constructors");
process.env.JWT_SECRET = "test_secret";

describe("Auth middleware test suite", () => {
  context("when auth token is not provided in cookies", () => {
    let sandbox;
    let next;

    const req = { signedCookies: {} };
    const res = {};

    before(() => {
      sandbox = sinon.createSandbox();
      next = sandbox.stub();

      authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("Should call next once", () => {
      sinon.assert.calledOnceWithExactly(
        next,
        sinon.match.instanceOf(Unauthorized)
      );
    });
  });

  context("when auth token is not valid jwt", () => {
    let sandbox;
    let next;

    const req = { signedCookies: { token: "invalid_token" } };
    const res = {};

    before(() => {
      sandbox = sinon.createSandbox();
      next = sandbox.stub();

      authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("Should call next once", () => {
      sinon.assert.calledOnceWithExactly(
        next,
        sinon.match.instanceOf(Unauthorized)
      );
    });
  });

  context("when auth token is valid jwt", () => {
    let sandbox;
    let next;

    const tokenPayload = { uid: "user_id" };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    const req = { signedCookies: { token } };
    const res = {};

    before(() => {
      sandbox = sinon.createSandbox();
      next = sandbox.stub();

      authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("should write to req.userId", () => {
      expect(req.userId).equal(tokenPayload.uid);
    });

    it("Should call next once", () => {
      sinon.assert.calledOnceWithExactly(next);
    });
  });
});
