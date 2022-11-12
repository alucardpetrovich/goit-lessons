import { Conflict } from "http-errors";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "./user.model";

export class UsersService {
  async create(dto: CreateUserDto) {
    const existingUser = await UserModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }
    return UserModel.create(dto);
  }

  async getUsers() {
    return UserModel.find();
  }
}

export const usersService = new UsersService();
