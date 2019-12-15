import { userModel } from '../user/user.model';
import { UnauthorizedError } from '../helpers/errorConstructors';
import { sessionModel } from './session.model';

class SessionController {
  constructor() {}

  get signIn() {
    return this._signIn.bind(this);
  }

  async _signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findUserByEmail(email);
      if ( !user ) {
        throw new UnauthorizedError('User with such email does not exist');
      }
      if ( !this._checkPasswordHash(user, password) ) {
        throw new UnauthorizedError('User password is wrong');
      }

      const { token } = await sessionModel.createSession(user);

      return res.status(201).send({
        token
      });

    } catch(err) {
      next(err);
    }
  }

  _checkPasswordHash(user, password) {
    const { password_salt, password_hash } = user;
    const receivedPasswordHash = userModel.createPasswordHash(password, password_salt);

    return password_hash === receivedPasswordHash;
  }
}

export const sessionController = new SessionController();
