import { userModel } from "./user.model.js";

class UsersService {
  async getUser(userId) {
    return userModel.findById(userId);
  }
}

export const usersService = new UsersService();
