const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../7_authentication_authorization/api/.env"),
});
const jwt = require("jsonwebtoken");

require = require("esm")(module);
const should = require("should");
const sinon = require("sinon");
const {
  authController,
} = require("../7_authentication_authorization/api/auth/auth.controller");
const {
  userModel,
} = require("../7_authentication_authorization/api/user/user.model");
const {
  UnauthorizedError,
} = require("../7_authentication_authorization/api/helpers/error.constructors");

describe("Authorization middleware Test Suite", () => {
  let sandbox;
  let nextStub;
  let findUserByTokenStub;

  before(() => {
    sandbox = sinon.createSandbox();
    nextStub = sandbox.stub();
    findUserByTokenStub = sandbox.stub(userModel, "findUserByToken");
  });

  after(() => {
    sandbox.restore();
  });

  context("when user have not provided auth token", () => {
    const req = { headers: {} };
    const res = {};

    before(async () => {
      await authController.authorize(req, res, nextStub);
    });

    after(() => {
      sandbox.reset();
    });

    it("should not call findUserByToken", () => {
      sinon.assert.notCalled(findUserByTokenStub);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextStub);

      sinon.assert.calledWithMatch(
        nextStub,
        sinon.match.instanceOf(UnauthorizedError)
      );
    });
  });

  context("when token is not valid jwt", () => {
    const req = { headers: { authorization: "hello" } };
    const res = {};

    before(async () => {
      await authController.authorize(req, res, nextStub);
    });

    after(() => {
      sandbox.reset();
    });

    it("should not call findUserByToken", () => {
      sinon.assert.notCalled(findUserByTokenStub);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextStub);

      sinon.assert.calledWithMatch(
        nextStub,
        sinon.match.instanceOf(UnauthorizedError)
      );
    });
  });

  context("when token is valid jwt and user exists", () => {
    const token = jwt.sign({}, process.env.JWT_SECRET);
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = {};

    const user = {};

    before(async () => {
      findUserByTokenStub.resolves(user);

      await authController.authorize(req, res, nextStub);
    });

    after(() => {
      sandbox.reset();
    });

    it("should call findUserByToken once", () => {
      sinon.assert.calledOnceWithExactly(findUserByTokenStub, token);
    });

    it("should add to req user & token", () => {
      req.user.should.be.eql(user);
      req.token.should.be.eql(token);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextStub);
      sinon.assert.calledWithExactly(nextStub);
    });
  });

  context("when token is valid jwt and user does not exist", () => {
    const token = jwt.sign({}, process.env.JWT_SECRET);
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = {};

    before(async () => {
      await authController.authorize(req, res, nextStub);
    });

    after(() => {
      sandbox.reset();
    });

    it("should call findUserByToken once", () => {
      sinon.assert.calledOnceWithExactly(findUserByTokenStub, token);
    });

    it("should not add to req user & token", () => {
      should.not.exist(req.user);
      should.not.exist(req.token);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextStub);

      sinon.assert.calledWithExactly(
        nextStub,
        sinon.match.instanceOf(UnauthorizedError)
      );
    });
  });
});
