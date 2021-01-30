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

  getAll() {
    return users;
  }

  getById(id) {
    return users.find((user) => user.id === id);
  }

  update(id, updateParams) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateParams,
    };

    return users[userIndex];
  }

  delete(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return;
    }

    users.splice(userIndex, 1);
  }
}
export const userModel = new UserModel();
