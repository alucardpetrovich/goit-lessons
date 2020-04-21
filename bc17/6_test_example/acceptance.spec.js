const should = require('should');
const UserServer = require('../4_mongodb_exampl/api/server');
const request = require('supertest');
const userModel = require('../4_mongodb_exampl/api/users/user.model');

describe('Acceptance tests suitcase example', () => {
  let server;

  before(async () => {
    const userServer = new UserServer();
    server = await userServer.start();
  });

  after(() => {
    server.close();
  });

  describe('POST /users', () => {

    it('should return 400 error', async () => {
      await request(server)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400);
    });

    context('when user with such email exists', () => {
      const existingEmail = 'existing@email.com';
      let userDoc;

      before(async () => {
        userDoc = await userModel.create({
          username: 'test user',
          email: existingEmail,
          password: 'password_hash'
        });
      });

      after(async () => {
        await userModel.findByIdAndDelete(userDoc._id);
      });

      it('should return 409 error', async () => {
        await request(server)
          .post('/users')
          .set('Content-Type', 'application/json')
          .send({
            username: 'new user',
            email: existingEmail,
            password: 'some_password'
          })
          .expect(409);
      });
    });

    context('when user with such email does not exist', () => {
      before(async () => { });

      after(async () => {
        await userModel.deleteMany();
      });

      it('should return 201 successfull response', async () => {
        const response = await request(server)
          .post('/users')
          .set('Content-Type', 'application/json')
          .send({
            username: 'new user',
            email: 'new_email@email.com',
            password: 'some_password'
          })
          .expect(201);

        const responseBody = response.body;

        should.exists(responseBody);
        responseBody.should.have.property('id').which.is.a.String();
        responseBody.should.not.have.property('password');

        const createdUser = await userModel.findById(responseBody.id);
        should.exists(createdUser);

      });
    });

  });

});
