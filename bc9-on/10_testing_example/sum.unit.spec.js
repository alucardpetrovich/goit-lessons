const { sum } = require("./sum");

describe("Sum function test suite", () => {
  // beforeAll(() => {
  //   console.log("beforeAll");
  // });

  // beforeEach(() => {
  //   console.log("beforeEach");
  // });

  // afterEach(() => {
  //   console.log("afterEach");
  // });

  // afterAll(() => {
  //   console.log("afterAll");
  // });

  it("Should add three numbers", () => {
    // console.log("first test");
    const actualResult = sum(6, 2, 9);
    const expectedResult = 17;

    expect(actualResult).toEqual(expectedResult);
  });

  it("Should throw an error", () => {
    // console.log("second test");
    expect(() => sum(6, 2, NaN)).toThrow();
  });
});
