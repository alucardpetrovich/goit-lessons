const { UserModel } = require("./user.model");
const { NotFound } = require("http-errors");
const fs = require("fs").promises;

class UsersService {
  async uploadAvatar(userId, path) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.avatarPath) {
      await this.#deleteOldAvatar(user.avatarPath);
    }

    user.avatarPath = path;
    return user.save();
  }

  async #deleteOldAvatar(path) {
    await fs.unlink(path);
  }
}

exports.usersService = new UsersService();
