const { NotFound, Conflict } = require("http-errors");
const { UserModel } = require("./user.model");

class UsersService {
  async createUser(createParams) {
    // 1. validate req body +
    // 2. generate unique id +
    // 3. create user in "DB" +
    // 4. send client successful response +
    const existingUser = await UserModel.findOne({ email: createParams.email });
    if (existingUser) {
      throw new Conflict("User already exists");
    }

    const user = await UserModel.create(createParams);
    return user;
  }

  async getUsers() {
    return UserModel.find();
  }

  async getUser(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }

  async updateUser(id, updateParams) {
    const user = await UserModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }

    return user;
  }

  async deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFound(`User with id '${id}' not found`);
    }
  }
}

exports.usersService = new UsersService();
