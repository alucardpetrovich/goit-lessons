require("should");

function add(num1, num2) {
  return num1 + num2;
}

describe("Test module name", () => {
  before(() => {
    // block in which some functionality would be executed
    // prior all tests in current describe block
    console.log("before block executed");
  });

  beforeEach(() => {
    // block in which some functionality would be executed
    // prior each test in current describe block
    console.log("beforeEach block executed");
  });

  afterEach(() => {
    // block in which some functionality would be executed
    // after each test in current describe block
    console.log("afterEach block executed");
  });

  after(() => {
    // block in which some functionality would be executed
    // after all tests in current describe block
    console.log("after block executed");
  });

  it("Some test here", () => {
    console.log("first test");
  });

  it("Second test", () => {
    console.log("second test");
  });

  it("should return sum of two passed numbers", () => {
    const sum = add(3, 4);
    sum.should.be.eql(7);
  });

  it("should perform deep equal", () => {
    ({ hello: "world" }.should.be.eql({ hello: "world" }));
  });

  it("should fail", () => {
    const sum = add(3, 4);
    sum.should.be.eql(8);
  });
});
