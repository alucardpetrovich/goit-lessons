const { expect } = require("chai");
const { sum } = require("./sum");

describe("First Test Suite", () => {
  before(() => {
    console.log("before");
  });

  beforeEach(() => {
    console.log("beforeEach");
  });

  afterEach(() => {
    console.log("afterEach");
  });

  after(() => {
    console.log("after");
  });

  it("should add two integers", () => {
    console.log("first test");
    const result = sum(5, 7);
    expect(result).to.be.equal(12);
  });

  it("should add two float", () => {
    console.log("second test");
    const result = sum(0.1, 0.2);
    expect(result).to.be.equal(0.3);
  });
});
