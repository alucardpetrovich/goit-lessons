import { User, UserModel } from "./user.model";
import { CreateUserDto, UpdateUserDto } from "./users.schemas";
import { NotFound, Conflict } from "http-errors";

export class UsersService {
  public async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await UserModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new Conflict("user with such email already exists");
    }

    return UserModel.create(dto);
  }

  public async getUserById(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFound(`user with id '${id}' not found`);
    }

    return user;
  }

  public async updateUser(id: string, params: UpdateUserDto): Promise<User> {
    // 1. validate req body +
    // 2. check if user exists +
    // 3. if not - throw 404 +
    // 4. if exists - update +
    // 5. return updated user +
    const updatedUser = await UserModel.updateUser(id, params);
    if (!updatedUser) {
      throw new NotFound(`user with id '${id}' not found`);
    }

    return updatedUser;
  }
}

export const usersService = new UsersService();
