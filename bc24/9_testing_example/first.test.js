const { sum } = require("./sum.js");

describe("First Test Suite", () => {
  beforeAll(() => {
    console.log("Before All");
  });

  beforeEach(() => {
    console.log("Before Each");
  });

  afterEach(() => {
    console.log("After Each");
  });

  afterAll(() => {
    console.log("After All");
  });

  it("Should add two integers", () => {
    const actualResult = sum(4, 5);
    console.log("first test");
    expect(actualResult).toEqual(9);
  });

  it("Should add two floats", () => {
    console.log("second test");
    const actualResult = sum(0.1, 0.2);
    expect(actualResult).toEqual(0.3);
  });
});
