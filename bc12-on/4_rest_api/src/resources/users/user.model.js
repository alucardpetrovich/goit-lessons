const uuid = require("uuid");

const users = [];

class UserModel {
  insertUser(createParams) {
    const id = uuid.v4();
    const user = { id, ...createParams };

    users.push(user);
    return user;
  }

  findUsers() {
    return users;
  }

  findById(id) {
    return users.find((u) => u.id === id);
  }

  updateById(id, updateParams) {
    const userIndex = this.findIndex(id);
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateParams,
    };

    return users[userIndex];
  }

  removeById(id) {
    const userIndex = this.findIndex(id);
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }

  findIndex(id) {
    return users.findIndex((u) => u.id === id);
  }
}

exports.userModel = new UserModel();
