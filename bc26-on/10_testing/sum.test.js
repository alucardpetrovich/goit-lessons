const { sum } = require("./sum");

describe("Sum func unit test suite", () => {
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
    const actualResult = sum(5, 13);
    const expectedResult = 18;

    expect(actualResult).toEqual(expectedResult);

    console.log("first test");
  });

  it("should add two float numbers", () => {
    const actualResult = sum(0.1, 0.2);
    const expectedResult = 0.3;

    expect(actualResult).toEqual(expectedResult);

    console.log("second test");
  });
});
