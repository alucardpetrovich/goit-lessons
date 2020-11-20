const {
  validate,
} = require("../7_auth_example/src/helpers/validate.middleware");
const sinon = require("sinon");
const Joi = require("joi");

describe("Validation middleware test suite", () => {
  let sandbox = sinon.createSandbox();
  let validationMiddleware;
  let resMock;
  let nextMock;

  before(() => {
    // 1. init functions mocks
    const testSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number(),
    });

    validationMiddleware = validate(testSchema);
    resMock = {
      send: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
    };
    nextMock = sandbox.stub();
  });

  after(() => {
    sandbox.restore();
  });

  context("when req body is valid", () => {
    const reqMock = { body: { name: "hello", age: 15 } };

    before(() => {
      // 2. test validation middleware
      validationMiddleware(reqMock, resMock, nextMock);
    });

    after(() => {
      // 3. reset mocks stats
      sandbox.resetHistory();
    });

    it("should not call res.status", () => {
      sinon.assert.notCalled(resMock.status);
    });

    it("should not call res.send", () => {
      sinon.assert.notCalled(resMock.send);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextMock);
      sinon.assert.calledWithExactly(nextMock);
    });
  });

  context("when req body is not valid", () => {
    const reqMock = { body: {} };

    before(() => {
      // 2. test validation middleware
      validationMiddleware(reqMock, resMock, nextMock);
    });

    after(() => {
      // 3. reset mocks stats
      sandbox.resetHistory();
    });

    it("should call res.status once", () => {
      sinon.assert.calledOnce(resMock.status);
      sinon.assert.calledWithExactly(resMock.status, 400);
    });

    it("should call res.send once", () => {
      sinon.assert.calledOnce(resMock.send);
    });

    it("should not call next", () => {
      sinon.assert.notCalled(nextMock);
    });
  });
});
