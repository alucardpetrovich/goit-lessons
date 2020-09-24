// 1. describe
// 2. it/test
const { add } = require("./add");

describe("Add Function Test Suite", () => {
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

  it("should add integers", () => {
    console.log("test1");
    const sum = add(1, 2);
    expect(sum).toEqual(3);
  });

  it("should add float", () => {
    console.log("test2");
    const sum = add(0.1, 0.2);
    expect(sum).toEqual(0.3);
  });
});
