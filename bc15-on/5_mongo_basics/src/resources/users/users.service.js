const { UserModel } = require("./users.model");
const { NotFound, Conflict } = require("http-errors");

class UsersService {
  async createUser(params) {
    const existingUser = await UserModel.findOne({ email: params.email });
    if (existingUser) {
      throw new Conflict(`User with such email already exists`);
    }

    return UserModel.create(params);
  }

  async getMany() {
    return UserModel.find();
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' was not found`);
    }

    return user;
  }

  async updateUser(id, params) {
    const user = await UserModel.updateById(id, params);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }

  async deleteUser(id) {
    const res = await UserModel.deleteOne({ _id: id });
    if (res.deletedCount === 0) {
      throw new NotFound(`User with id '${id}' not found`);
    }
  }
}

exports.usersService = new UsersService();
