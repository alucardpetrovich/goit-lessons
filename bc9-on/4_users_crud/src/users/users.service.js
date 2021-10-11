const { Conflict, NotFound } = require("http-errors");
const { userModel } = require("./user.model");

class UsersService {
  createUser(createParams) {
    // 1. validate req body +
    // 2. check if there is user with such email +
    // 3. throw 409 error if user exists +
    // 4. if not exists - create user with params id, email, username, password +
    // 5. send successful response +
    const { email } = createParams;
    const existingUser = userModel.findByEmail(email);
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const newUser = userModel.create(createParams);
    return newUser;
  }

  getUsers() {
    return userModel.findUsers();
  }

  getUser(id) {
    // 1. get user by id +
    // 2. if user does not exist - throw 404 +
    // 3. else return successful response +

    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  updateUser(id, updateParams) {
    // 1. validate body +
    // 2. find user +
    // 3. throw error if not exist +
    // 4. else - update user +
    // 5. return successful response +

    const updatedUser = userModel.updateUser(id, updateParams);
    if (!updatedUser) {
      throw new NotFound("User not found");
    }

    return updatedUser;
  }

  deleteUser(id) {
    // 1. find user +
    // 2. throw error if not exist +
    // 3. else - delete user +
    // 4. return successful response +

    const deletedUser = userModel.deleteById(id);
    if (!deletedUser) {
      throw new NotFound("User not found");
    }
  }
}
exports.usersService = new UsersService();
