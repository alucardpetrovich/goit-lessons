const { UserModel } = require("./user.model");
const { Conflict, NotFound } = require("http-errors");

class UsersService {
  async createUser(userParams) {
    const { email } = userParams;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`User with email '${email}' already exists`);
    }

    return UserModel.create(userParams);
  }

  async getUsers() {
    return UserModel.find();
  }

  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' does not exist`);
    }

    return user;
  }
}

exports.usersService = new UsersService();
