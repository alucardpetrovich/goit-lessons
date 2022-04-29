const { userModel } = require("./users.model");
const { NotFound } = require("http-errors");

class UsersService {
  create(reqBody) {
    return userModel.insert(reqBody);
  }

  getAll() {
    return userModel.findAll();
  }

  getById(id) {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }
}

exports.usersService = new UsersService();
