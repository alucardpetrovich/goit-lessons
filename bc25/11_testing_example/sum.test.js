const { sum } = require("./sum");

describe("Sum func test suite", () => {
  beforeAll(() => {
    console.log("before all");
  });

  beforeEach(() => {
    console.log("before each");
  });

  afterEach(() => {
    console.log("after each");
  });

  afterAll(() => {
    console.log("after all");
  });

  it("should add two integers", () => {
    console.log("first test");
    const result = sum(1, 2);
    expect(result).toEqual(3);
  });

  it("should add two floats", () => {
    console.log("second test");
    const result = sum(0.1, 0.2);
    expect(result).toEqual(0.3);
  });

  it("should throw error if non-number was passed", () => {
    expect(() => sum(1, "non-number")).toThrow();
  });
});
