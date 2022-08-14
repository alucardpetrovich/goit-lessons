import { User, userModel } from "./user.model";
import { CreateUserDto } from "./users.schemas";
import { NotFound } from 'http-errors';

export class UsersService {
  public createUser(dto: CreateUserDto): User {
    return userModel.insert(dto);
  }

  public getUserById(id: string): User {
    const user = userModel.findById(id);
    if (!user) {
      throw new NotFound(`user with id '${id}' not found`);
    }

    return user;
  }
}

export const usersService = new UsersService();
