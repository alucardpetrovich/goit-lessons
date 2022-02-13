const { NotFound, Conflict } = require("http-errors");
const { UserModel } = require("./user.model");

class UsersService {
  async createUser(createParams) {
    const existingUser = await UserModel.findOne({ email: createParams.email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    return UserModel.create(createParams);
  }

  async getUsers() {
    return UserModel.find();
  }

  async getUser(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound("user not found");
    }

    return user;
  }

  async updateUser(id, updateParams) {
    // 1. validate req body +
    // 2. find user with such id
    // 3. if not found - throw 404 error
    // 4. return user

    const user = await UserModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
    if (!user) {
      throw new NotFound("user not found");
    }

    return user;
  }

  async deleteUser(id) {
    const deleteResult = await UserModel.deleteOne({ _id: id });
    if (!deleteResult.deletedCount) {
      throw new NotFound("user not found");
    }
  }
}

exports.usersService = new UsersService();
