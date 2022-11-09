import { CreateUserDto } from "./dto/create-user.dto";
import { userModel } from "./user.model";

export class UsersService {
  create(dto: CreateUserDto) {
    return userModel.insert(dto);
  }

  getUsers() {
    return userModel.findAll();
  }
}

export const usersService = new UsersService();
