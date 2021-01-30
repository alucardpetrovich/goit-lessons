import mongoose from "mongoose";
import { NotFound } from "../helpers/error.constructors.js";
import { userModel } from "./user.model.js";

const { Types } = mongoose;

export class UsersService {
  async createUser(userParams) {
    // 1. validate req body +
    // 2. create id (uuid) +
    // 3. create user +
    // 4. send response +

    return userModel.create(userParams);
  }

  async getUsers() {
    return userModel.find();
  }

  async getUserById(id) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }

    return user;
  }

  async updateUser(id, updateParams) {
    // 1. validate req body +
    // 2. check if user exists +
    // 3. send 404 if user not exist +
    // 4. update user +
    // 5. send successful response
    const updatedUser = await userModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFound(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async deleteUser(id) {
    const result = await userModel.deleteOne({ _id: new Types.ObjectId(id) });

    if (!result.deletedCount) {
      throw new NotFound(`User with id ${id} not found`);
    }
  }
}
export const usersService = new UsersService();
