import { sum } from "./sum";

describe("Sum test suite", () => {
  beforeAll(() => {
    console.log("before All");
  });

  beforeEach(() => {
    console.log("before Each");
  });

  afterEach(() => {
    console.log("after each");
  });

  afterAll(() => {
    console.log("after all");
  });

  it("should add three integers", () => {
    const actualResult = sum(4, 2, 9);
    const expectedResult = 15;

    expect(actualResult).toEqual(expectedResult);
    console.log("first test");
  });

  it("should add three floats", () => {
    const actualResult = sum(0.1, 0.2, 0.3);
    const expectedResult = 0.6;

    expect(actualResult).toEqual(expectedResult);
    console.log("second test");
  });
});
