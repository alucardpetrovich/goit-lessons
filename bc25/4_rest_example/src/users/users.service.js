const { userModel } = require("./user.model");
const { Conflict, NotFound } = require("http-errors");

class UsersService {
  createUser(userParams) {
    // 1. find existing user with provided email +
    // 2. if exists - throw 409 error +
    // 3. if does not exist - create new user +
    // 4. send successful response

    const existingUser = userModel.findUserByEmail(userParams.email);
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const newUser = userModel.createUser(userParams);
    return newUser;
  }

  getUsers() {
    return userModel.findUsers();
  }

  getUser(id) {
    // 1. find user by id
    // 2. if not found - throw not found
    // 3. if exists - return successful response

    const user = userModel.findUserById(id);
    if (!user) {
      throw new NotFound("User with such id does not exist");
    }

    return user;
  }

  updateUser(id, updateParams) {
    // 1. validate req body +
    // 4. update user +
    // 3. if not found - throw not found +
    // 5. send successful response

    const user = userModel.updateUser(id, updateParams);
    if (!user) {
      throw new NotFound("User with such id does not exist");
    }

    return user;
  }

  deleteUser(id) {
    // 1. delete user +
    // 2. if not found - throw not found +
    // 3. send successful response +
    const removedUsers = userModel.removeUser(id);
    if (!removedUsers) {
      throw new NotFound("User with such id does not exist");
    }
  }
}

exports.usersService = new UsersService();
