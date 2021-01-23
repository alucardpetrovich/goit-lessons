import { v4 } from "uuid";

const users = [];

export class UserModel {
  create(userParams) {
    const id = v4();

    const newUser = {
      id,
      ...userParams,
    };
    users.push(newUser);

    return newUser;
  }
}
export const userModel = new UserModel();
