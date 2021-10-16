import { Conflict, NotFound } from "http-errors";
import { UserModel } from "./user.model";
import { CreateUserParams, UpdateUserParams } from "./users.schema";

class UsersService {
  async createUser(createParams: CreateUserParams) {
    // 1. validate req body +
    // 2. check if there is user with such email +
    // 3. throw 409 error if user exists +
    // 4. if not exists - create user with params id, email, username, password +
    // 5. send successful response +
    const { email } = createParams;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const newUser = await UserModel.create(createParams);
    return newUser;
  }

  async getUsers() {
    return UserModel.find();
  }

  async getUser(id: string) {
    // 1. get user by id +
    // 2. if user does not exist - throw 404 +
    // 3. else return successful response +

    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async updateUser(id: string, updateParams: UpdateUserParams) {
    // 1. validate body +
    // 2. find user +
    // 3. throw error if not exist +
    // 4. else - update user +
    // 5. return successful response +

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFound("User not found");
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    // 1. find user +
    // 2. throw error if not exist +
    // 3. else - delete user +
    // 4. return successful response +

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFound("User not found");
    }
  }
}

export const usersService = new UsersService();
