const { NotFound } = require('http-errors');
const { userModel } = require('./user.model');

class UsersService {
  createUser(createParams) {
    // 1. validate req body +
    // 2. generate unique id +
    // 3. create user in "DB" +
    // 4. send client successful response +
    const user = userModel.createUser(createParams);
    return user;
  }

  getUsers() {
    return userModel.findUsers();
  }

  getUser(id) {
    const user = userModel.findUserById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }

  updateUser(id, updateParams) {
    const user = userModel.findUserById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return userModel.updateUser(id, updateParams);
  } 

  deleteUser(id) {
    const user = userModel.findUserById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    userModel.removeUser(id);
  }
}

exports.usersService = new UsersService();
