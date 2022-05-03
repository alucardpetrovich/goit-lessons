const { UserModel } = require("./users.model");
const { NotFound, Conflict } = require("http-errors");

class UsersService {
  async create(reqBody) {
    const existingUser = await UserModel.findOne({ email: reqBody.email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    return UserModel.create(reqBody);
  }

  async getAll() {
    return UserModel.find();
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }

  async updateOne(id, updateParams) {
    const user = await UserModel.updateUser(id, updateParams);
    if (!user) {
      throw new NotFound(`User with id '${id}' was not found`);
    }

    return user;
  }

  async deleteOne(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFound(`User with id '${id}' was not found`);
    }
  }
}

exports.usersService = new UsersService();
