const { sum } = require("./sum");

describe("Sum Test Suite", () => {
  beforeAll(() => {
    console.log("Before all");
  });

  beforeEach(() => {
    console.log("Before each");
  });

  afterEach(() => {
    console.log("after each");
  });

  afterAll(() => {
    console.log("after all");
  });

  it("should add two integers", () => {
    console.log("first test");
    const result = sum(1, 5);
    expect(result).toEqual(6);
  });

  it("should add two floats", () => {
    console.log("second test");
    const result = sum(0.1, 0.2);
    expect(result).toEqual(0.3);
  });
});
