const { userModel } = require("./users.model");
const { NotFound } = require("http-errors");

class UsersService {
  createUser(params) {
    return userModel.insertOne(params);
  }

  getMany() {
    return userModel.find();
  }

  getById(id) {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' was not found`);
    }

    return user;
  }

  updateUser(id, params) {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return userModel.updateOne(id, params);
  }

  deleteUser(id) {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    userModel.deleteOne(id);
  }
}

exports.usersService = new UsersService();
