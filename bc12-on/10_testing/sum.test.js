const { sum } = require("./sum");

describe("Sum function Test Suite", () => {
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

  it("should add two integers", () => {
    console.log("first test");
    const actualResult = sum(5, 12);
    const expectedResult = 17;

    expect(actualResult).toEqual(expectedResult);
  });

  it("should add two floats", () => {
    console.log("second test");
    const actualResult = sum(0.1, 0.2);
    const expectedResult = 0.3;

    expect(actualResult).toEqual(expectedResult);
  });
});
