const { UserModel } = require("./users.model");
const { NotFound } = require("http-errors");

class UsersService {
  async getCurrentUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }
}

exports.usersService = new UsersService();
