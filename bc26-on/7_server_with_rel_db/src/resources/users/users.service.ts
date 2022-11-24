import { Conflict } from "http-errors";
import { CreateUserDto } from "./dto/create-user.dto";
import { getUsersRepository } from "./users.repository";

export class UsersService {
  async create(dto: CreateUserDto) {
    const existingUser = await getUsersRepository().findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    return getUsersRepository().save(dto);
  }

  async getUsers() {
    return getUsersRepository().find();
  }
}

export const usersService = new UsersService();
