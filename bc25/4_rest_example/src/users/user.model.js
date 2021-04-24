const uuid = require("uuid");

const users = [];

class UserModel {
  findUserByEmail(email) {
    return users.find((user) => user.email === email);
  }

  createUser(userParams) {
    const newUser = {
      id: uuid.v4(),
      ...userParams,
    };

    users.push(newUser);

    return newUser;
  }

  findUsers() {
    return users;
  }

  findUserById(id) {
    return users.find((user) => user.id === id);
  }

  updateUser(id, updateParams) {
    const userIndex = this.findUserIndex(id);
    if (userIndex === -1) {
      return;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateParams,
    };

    return users[userIndex];
  }

  removeUser(id) {
    const userIndex = this.findUserIndex(id);
    if (userIndex === -1) {
      return;
    }

    return users.splice(userIndex, 1);
  }

  findUserIndex(id) {
    return users.findIndex((user) => user.id === id);
  }
}

exports.userModel = new UserModel();
