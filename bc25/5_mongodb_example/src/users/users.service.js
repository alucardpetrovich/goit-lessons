const { UserModel } = require("./user.model");
const { Conflict, NotFound } = require("http-errors");

class UsersService {
  async createUser(userParams) {
    // 1. find existing user with provided email +
    // 2. if exists - throw 409 error +
    // 3. if does not exist - create new user +
    // 4. send successful response

    const existingUser = await UserModel.findOne({ email: userParams.email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const newUser = await UserModel.create(userParams);

    return newUser;
  }

  async getUsers() {
    return UserModel.find();
  }

  async getUser(id) {
    // 1. find user by id
    // 2. if not found - throw not found
    // 3. if exists - return successful response

    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound("User with such id does not exist");
    }

    return user;
  }

  async updateUser(id, updateParams) {
    // 1. validate req body +
    // 4. update user +
    // 3. if not found - throw not found +
    // 5. send successful response

    const user = await UserModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
    if (!user) {
      throw new NotFound("User with such id does not exist");
    }

    return user;
  }

  async deleteUser(id) {
    // 1. delete user +
    // 2. if not found - throw not found +
    // 3. send successful response +
    const removedUser = await UserModel.findByIdAndDelete(id);
    if (!removedUser) {
      throw new NotFound("User with such id does not exist");
    }
  }
}

exports.usersService = new UsersService();
