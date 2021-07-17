const { Unauthorized } = require("http-errors");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const {
  authorize,
} = require("../8_auth_example/src/auth/authorize.middleware");
const { UserModel } = require("../8_auth_example/src/users/user.model");

process.env.JWT_SECRET = "test";

describe("Auth middleware test suite", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  after(() => {
    sandbox.restore();
  });

  context("when auth header was not received", () => {
    const req = { headers: {} };
    const res = {};
    let next;

    before(async () => {
      next = sandbox.stub();
      sandbox.stub(UserModel, "findById");

      await authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("should not call UserModel.findById", () => {
      sinon.assert.notCalled(UserModel.findById);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(next);
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(Unauthorized));
    });
  });

  context("when auth header is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid_token" } };
    const res = {};
    let next;

    before(async () => {
      next = sandbox.stub();
      sandbox.stub(UserModel, "findById");

      await authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("should not call UserModel.findById", () => {
      sinon.assert.notCalled(UserModel.findById);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(next);
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(Unauthorized));
    });
  });

  context("when user related to token does not exist", () => {
    const payload = { id: 1 };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    let next;

    before(async () => {
      next = sandbox.stub();
      sandbox.stub(UserModel, "findById");

      await authorize(req, res, next);
    });

    after(() => {
      sandbox.restore();
    });

    it("should call UserModel.findById once", () => {
      sinon.assert.calledOnce(UserModel.findById);
      sinon.assert.calledWithExactly(UserModel.findById, payload.id);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(next);
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(Unauthorized));
    });
  });
});
