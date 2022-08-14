import * as uuid from "uuid";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const users: User[] = [];

export class UserModel {
  insert(userParams: Omit<User, "id">) {
    const user: User = {
      id: uuid.v4(),
      ...userParams,
    };
    users.push(user);
    return user;
  }

  findById(id: string) {
    return users.find((user) => user.id === id);
  }
}

export const userModel = new UserModel();
