const { sum } = require("./sum");

describe("sum function test suite", () => {
  beforeAll(() => {
    console.log("beforeAll");
  });

  beforeEach(() => {
    console.log("beforeEach");
  });

  afterEach(() => {
    console.log("afterEach");
  });

  afterAll(() => {
    console.log("afterAll");
  });

  it("should add two integer numbers", () => {
    const actualResult = sum(5, 9);
    const expectedResult = 14;

    expect(actualResult).toEqual(expectedResult);
    console.log("first test");
  });

  it("should add two floating point numbers", () => {
    const actualResult = sum(0.1, 0.2);
    const expectedResult = 0.3;

    expect(actualResult).toEqual(expectedResult);
    console.log("second test");
  });
});
