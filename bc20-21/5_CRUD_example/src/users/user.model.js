const uuid = require("uuid");

const users = [];

class UserModel {
  createUser(userParams) {
    const id = uuid.v4();

    const userToCreate = { ...userParams, id };
    users.push(userToCreate);

    return userToCreate;
  }

  findUsers() {
    return users;
  }

  findUserById(userId) {
    return users.find((user) => user.id === userId);
  }

  updateUser(userId, paramsToUpdate) {
    const userInd = users.findIndex((user) => user.id === userId);
    if (userInd === -1) {
      return null;
    }

    users[userInd] = { ...users[userInd], ...paramsToUpdate };

    return users[userInd];
  }

  deleteUserById(userId) {
    const userInd = users.findIndex((user) => user.id === userId);
    if (userInd === -1) {
      return null;
    }

    users.splice(userInd, 1);
  }
}

exports.userModel = new UserModel();
