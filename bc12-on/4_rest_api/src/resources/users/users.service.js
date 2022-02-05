const { NotFound } = require("http-errors");
const { userModel } = require("./user.model");

class UsersService {
  createUser(createParams) {
    return userModel.insertUser(createParams);
  }

  getUsers() {
    return userModel.findUsers();
  }

  getUser(id) {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound("user not found");
    }

    return user;
  }

  updateUser(id, updateParams) {
    // 1. validate req body +
    // 2. find user with such id
    // 3. if not found - throw 404 error
    // 4. return user
    const user = userModel.updateById(id, updateParams);
    if (!user) {
      throw new NotFound("user not found");
    }

    return user;
  }

  deleteUser(id) {
    const isDeleted = userModel.removeById(id);
    if (!isDeleted) {
      throw new NotFound("user not found");
    }
  }
}

exports.usersService = new UsersService();
