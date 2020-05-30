require = require('esm')(module);
const request = require('supertest');
const { assert } = require('chai');
const { AuthServer } = require('../9_auth_example/api/server');
const { UserModel } = require('../9_auth_example/api/users/users.model');
const faker = require('faker');

describe('Auth Controller system tests suite', () => {
    let server;

    before(async () => {
        const authServer = new AuthServer();
        await authServer.start();
        server = authServer.server;
    });

    after(() => {
        server.close();
    });

    describe('POST /auth/sign-up', () => {

        context('when validation failed', () => {
            let response;
            
            before(async () => {
                response = await request(server)
                    .post('/auth/sign-up')
                    .send()
                ;
            });

            it('should throw 400 error', () => {
                assert.strictEqual(response.status, 400);
            });
        });

        context('when user with such email already exists', () => {
            const existingEmail = faker.internet.email();

            before(async () => {
                await UserModel.create({
                    username: faker.name.firstName(),
                    email: existingEmail,
                    passwordHash: faker.random.words(),
                });

                response = await request(server)
                    .post('/auth/sign-up')
                    .send({
                        username: faker.name.firstName(),
                        email: existingEmail,
                        password: faker.random.words()
                    });
                ;
            });

            after(async () => {
                await UserModel.deleteMany();
            });

            it('should throw 409 error', () => {
                assert.strictEqual(response.status, 409);
            });
        });

        context('when everything ok', () => {
            const email = faker.internet.email();
            const reqBody = {
                username: faker.name.firstName(),
                email,
                password: faker.random.words()
            }
            let user;

            before(async () => {
                response = await request(server)
                    .post('/auth/sign-up')
                    .send(reqBody);
                ;

                user = await UserModel.findOne({ email });
            });

            after(async () => {
                await UserModel.deleteMany();
            });

            it('should return 201', () => {
                assert.strictEqual(response.status, 201);
            });

            it('should create new user', () => {
                assert.isDefined(user);
            });

            it('should return expected response body', () => {
                const expectedResponse = {
                    id: user._id.toString(),
                    username: reqBody.username,
                    email: reqBody.email
                };

                assert.deepEqual(response.body, expectedResponse);
            });
        });

    });
});
