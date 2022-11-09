import * as uuid from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";

const users: User[] = [];

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  insert(params: CreateUserDto) {
    const id = uuid.v4();

    const user: User = { id, ...params };

    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }
}

export const userModel = new UserModel();
