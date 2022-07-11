const { sum } = require("./sum");

describe("Sum test suite", () => {
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
    const actualResult = sum(5, 43);
    const expectedResult = 48;

    expect(actualResult).toEqual(expectedResult);
    console.log("test1");
  });

  it("should add two floats", () => {
    const actualResult = sum(0.1, 0.2);
    const expectedResult = 0.3;

    expect(actualResult).toEqual(expectedResult);
    console.log("test2");
  });
});
