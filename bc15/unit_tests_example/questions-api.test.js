require("should");
const sinon = require("sinon");
const request = require("supertest-promised");
const QuestionServer = require("../mongodb_example/app/server");
const QuestionModel = require("../mongodb_example/app/question/question.model");

describe("Question API", () => {
  let server;
  let questionsServer;

  before(async () => {
    questionsServer = new QuestionServer();
    server = await questionsServer.start(true);
  });

  afterEach(async () => {
    await questionsServer.clearDb();
  });

  after(() => {
    server.close();
  });

  it("Should work", () => {
    (1).should.be.eql(1);
    ({ a: 1, b: 1, c: 1 }.should.be.eql({ b: 1, c: 1, a: 1 }));
  });

  context("if there is questions", () => {
    let expectedQuestion;

    beforeEach(async () => {
      const { _id, answer, question, __v } = await QuestionModel.create({
        question: "test question",
        answer: "test answer"
      });

      expectedQuestion = {
        _id: _id.toString(),
        answer,
        question,
        __v
      };
    });

    it("should return questions array", async () => {
      const responseBody = await request(server)
        .get("/questions")
        .set("Accept", "application/json")
        .send()
        .expect(200)
        .expect("Content-Type", /json/)
        .end()
        .get("body");

      responseBody.should.be.Array();
      responseBody.should.have.length(1);
      responseBody[0].should.be.eql(expectedQuestion);
    });
  });

  context("if there is no questions", () => {
    it("should return empty array", async () => {
      const responseBody = await request(server)
        .get("/questions")
        .set("Accept", "application/json")
        .send()
        .expect(200)
        .expect("Content-Type", /json/)
        .end()
        .get("body");

      responseBody.should.be.Array();
      responseBody.should.have.length(0);
    });
  });

  context("if there is questions with sinon mock", () => {
    let sandbox;
    let getQuestionsStub;
    let expectedResult = [
      {
        question: "question",
        answer: "answer"
      }
    ];

    before(() => {
      sandbox = sinon.createSandbox();

      getQuestionsStub = sandbox.stub(QuestionModel, "getQuestions");
      getQuestionsStub.resolves(expectedResult);
    });

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it("should return questions array", async () => {
      const responseBody = await request(server)
        .get("/questions")
        .set("Accept", "application/json")
        .send()
        .expect(200)
        .expect("Content-Type", /json/)
        .end()
        .get("body");

      responseBody.should.be.Array();
      responseBody.should.have.length(1);
      responseBody.should.be.eql(expectedResult);

      sinon.assert.calledOnce(getQuestionsStub);
    });
  });
});
