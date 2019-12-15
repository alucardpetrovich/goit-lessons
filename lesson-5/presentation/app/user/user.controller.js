import { userModel } from './user.model';
import { ConflictError } from '../helpers/errorConstructors';

class UserController {
  constructor() {}

  get registerUser() {
    return this._registerUser.bind(this);
  }

  async _registerUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findUserByEmail(email);
      if ( user ) {
        throw new ConflictError('User with such email already exists');
      }

      await userModel.createUser(email, password);

      return res.status(201).send();

    } catch(err) {
      next(err);
    }
  }

}

export const userController = new UserController();
