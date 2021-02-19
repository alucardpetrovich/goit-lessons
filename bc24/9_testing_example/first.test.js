const { expect } = require("chai");
const { sum } = require("./sum.js");

describe("First Test Suite", () => {
  before(() => {
    console.log("Before All");
  });

  beforeEach(() => {
    console.log("Before Each");
  });

  afterEach(() => {
    console.log("After Each");
  });

  after(() => {
    console.log("After All");
  });

  it("Should add two integers", () => {
    const actualResult = sum(4, 5);
    console.log("first test");
    expect(actualResult).equal(9);
  });

  it("Should add two floats", () => {
    console.log("second test");
    const actualResult = sum(0.1, 0.2);
    expect(actualResult).equal(0.3);
  });
});
