require = require('esm')(module);
const sinon = require('sinon');
const { assert } = require('chai');
const {authController, AuthController} = require('../9_auth_example/api/auth/auth.controller');
const { UserModel } = require('../9_auth_example/api/users/users.model');
const { Unauthorized } = require('../9_auth_example/api/helpers/errorConstructors');

describe('Auth Controller unit tests suite', () => {
    describe('#authorize', () => {
        let sandbox;
        let verifyTokenStub;
        let findByTokenStub;
        let nextStub;

        before(() => {
            sandbox = sinon.createSandbox();
            verifyTokenStub = sandbox.stub(AuthController.prototype, 'verifyToken');
            findByTokenStub = sandbox.stub(UserModel, 'findByToken');
            nextStub = sandbox.stub();
        });

        after(() => {
            sandbox.restore();
        });

        context('when token verification fails', () => {
            const req = {
                cookies: { token: 'test_token' }
            };

            before(async () => {
                verifyTokenStub.throws();

                await authController.authorize(req, null, nextStub);
            });

            after(() => {
                sandbox.reset();
            });

            it('should call verifyToken once', () => {
                sinon.assert.calledOnce(verifyTokenStub);
                sinon.assert.calledWithExactly(verifyTokenStub, req.cookies.token);
            });

            it('should not call findByToken', () => {
                sinon.assert.notCalled(findByTokenStub);
            });

            it('should not write to req.user', () => {
                assert.strictEqual(req.user, undefined);
            });

            it('should call next once', () => {
                sinon.assert.calledOnce(nextStub);
                sinon.assert.calledWithExactly(nextStub, sinon.match.instanceOf(Unauthorized));
            })
        });

        context('when corresponding user not found', () => {
            const req = {
                cookies: { token: 'test_token' }
            };

            before(async () => {
                await authController.authorize(req, null, nextStub);
            });

            after(() => {
                sandbox.reset();
            });

            it('should call verifyToken once', () => {
                sinon.assert.calledOnce(verifyTokenStub);
                sinon.assert.calledWithExactly(verifyTokenStub, req.cookies.token);
            });

            it('should call findByToken once', () => {
                sinon.assert.calledOnce(findByTokenStub);
                sinon.assert.calledWithExactly(findByTokenStub, req.cookies.token);
            });

            it('should not write to req.user', () => {
                assert.strictEqual(req.user, undefined);
            });

            it('should call next once', () => {
                sinon.assert.calledOnce(nextStub);
                sinon.assert.calledWithExactly(nextStub, sinon.match.instanceOf(Unauthorized));
            })
        });

        context('when corresponding user found', () => {
            const req = {
                cookies: { token: 'test_token' }
            };
            const user = { id: 'user_id' };

            before(async () => {
                findByTokenStub.resolves(user);

                await authController.authorize(req, null, nextStub);
            });

            after(() => {
                sandbox.reset();
            });

            it('should call verifyToken once', () => {
                sinon.assert.calledOnce(verifyTokenStub);
                sinon.assert.calledWithExactly(verifyTokenStub, req.cookies.token);
            });

            it('should call findByToken once', () => {
                sinon.assert.calledOnce(findByTokenStub);
                sinon.assert.calledWithExactly(findByTokenStub, req.cookies.token);
            });

            it('should write to req.user', () => {
                assert.strictEqual(req.user, user);
            });

            it('should call next once', () => {
                sinon.assert.calledOnce(nextStub);
                sinon.assert.calledWithExactly(nextStub);
            })
        });
    });
});
