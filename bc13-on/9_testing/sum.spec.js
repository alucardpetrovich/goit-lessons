const { sum } = require("./sum");

describe("Sum function unit tests", () => {
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
    const actualResult = sum(45, 38);
    const expectedResult = 83;

    expect(actualResult).toEqual(expectedResult);
    console.log("first test");
  });

  it("should add two floats", () => {
    const actualResult = sum(0.2, 0.1);
    const expectedResult = 0.3;

    expect(actualResult).toEqual(expectedResult);
    console.log("second test");
  });
});
