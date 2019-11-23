const initServer = require('../../lesson-4/app/server');
const request = require('supertest-promised');
const sinon = require('sinon');
const QuestionModel = require('../../lesson-4/app/models/questions.model');
require('should');

describe('Questions API', () => {
  let server;
  let app;

  before(async () => {
    const params = await initServer();
    server = params.server;
    app = params.app;
  });

  after(() => {
    server.close();
  });
    
  describe('#getRandomQuestion', () => {

    it('should create new question', async () => {
      const responseBody = await request(app)
        .get('/questions/random')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end()
        .get('body')
      ;

      responseBody.should.have.property('question').which.is.a.String();
      responseBody.should.have.property('answer').which.is.a.String();
    });
  
  });

  describe('#getRandomQuestion with QuestionModel.findRandomQuestion stub', () => {
    let sandbox;
    let findRandomQuestionStub;

    before(() => {
      sandbox = sinon.createSandbox();
      findRandomQuestionStub = sandbox.stub(QuestionModel, 'findRandomQuestion');
    });
    
    beforeEach(() => {});

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it('should create new question', async () => {
      await request(app)
        .get('/questions/random')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end()
        .get('body')
      ;

      sinon.assert.calledOnce(findRandomQuestionStub);
      sinon.assert.calledWithExactly(findRandomQuestionStub);
    });
  });

});
