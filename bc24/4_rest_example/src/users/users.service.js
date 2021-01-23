import { userModel } from "./user.model.js";

export class UsersService {
  createUser(userParams) {
    // 1. validate req body +
    // 2. create id (uuid) +
    // 3. create user +
    // 4. send response +

    return userModel.create(userParams);
  }
}
export const usersService = new UsersService();
