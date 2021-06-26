const uuid = require('uuid');

const users = [];

class UserModel {
  createUser(params) {
    const id = uuid.v4();

    const user = {
      id,
      ...params,
    }

    users.push(user);

    return user;
  }

  findUsers() {
    return users;
  }

  findUserById(id) {
    return users.find(user => user.id === id);
  }

  updateUser(id, updateParams) {
    const userIndex = users.findIndex(user => user.id === id);
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
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return;
    }

    users.splice(userIndex, 1);
  }
}

exports.userModel = new UserModel();
