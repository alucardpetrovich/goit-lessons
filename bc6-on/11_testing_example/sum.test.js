const { sum } = require("./sum");
const { expect, assert } = require("chai");

describe("Sum function test suite", () => {
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

  it("Should add two integer numbers", () => {
    console.log("first test");
    const actualResult = sum(1, 3);
    const expectedResult = 4;
    // if (actualResult !== expectedResult) {
    //   throw new Error(
    //     `actualResult '${actualResult} !== expectedResult '${expectedResult}'`
    //   );
    // }
    expect(actualResult).to.eql(expectedResult);
    // assert.equal(actualResult, expectedResult);
  });

  it("Should add two float numbers", () => {
    console.log("second test");
    const actualResult = sum(0.1, 0.2);
    const expectedResult = 0.3;
    expect(actualResult).to.eql(expectedResult);
  });

  it("Should throw error if passed not number type", () => {
    console.log("third test");
    expect(() => sum(0.1, "asdfadsf")).to.throw();
  });

  it("Should parse strings", () => {
    console.log("fourth test");
    const actualResult = sum(1, "3");
    const expectedResult = 4;
    expect(actualResult).to.eql(expectedResult);
  });
});
