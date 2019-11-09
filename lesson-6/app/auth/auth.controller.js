const { ForbiddenError, UnauthorizedError } = require('../helpers/errors.helper');
const UserModel = require('../user/user.model');
const SessionModel = require('./session.model');

class AuthController {
  constructor() {}

  async signUpPlain(req, res, next) {
    try {
      const { email } = req.body;

      const userWithSameEmail = await UserModel.findUserByEmail(email);
      if ( userWithSameEmail ) {
        throw new UnauthorizedError('User with such email already exists');
      }

      await UserModel.createUser(req.body);
      
      return res.status(201).send();

    } catch(err) {
      next(err);
    }
  }

  async signInPlain(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findUserByEmail(email);
      if ( !user ) {
        throw new UnauthorizedError('User not exist');
      }

      const isPasswordValid = UserModel.checkPassword(user, password);
      if ( !isPasswordValid ) {
        throw new UnauthorizedError('User password is not valid');
      }

      const session = await SessionModel.createSession(user.id);

      return res.status(201).json({ token: session.session_token });

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new AuthController();
