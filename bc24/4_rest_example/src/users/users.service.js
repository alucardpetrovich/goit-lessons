import { NotFound } from "../helpers/error.constructors.js";
import { userModel } from "./user.model.js";

export class UsersService {
  createUser(userParams) {
    // 1. validate req body +
    // 2. create id (uuid) +
    // 3. create user +
    // 4. send response +

    return userModel.create(userParams);
  }

  getUsers() {
    return userModel.getAll();
  }

  getUserById(id) {
    const user = userModel.getById(id);
    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }

    return user;
  }

  updateUser(id, updateParams) {
    // 1. validate req body +
    // 2. check if user exists +
    // 3. send 404 if user not exist +
    // 4. update user +
    // 5. send successful response
    this.getUserById(id);
    return userModel.update(id, updateParams);
  }

  deleteUser(id) {
    this.getUserById(id);
    userModel.delete(id);
  }
}
export const usersService = new UsersService();
