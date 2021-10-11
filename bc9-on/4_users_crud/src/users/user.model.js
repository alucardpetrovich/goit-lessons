const uuid = require("uuid");

const users = [];

class UserModel {
  findByEmail(email) {
    return users.find((user) => user.email === email);
  }

  findById(id) {
    return users.find((user) => user.id === id);
  }

  create(createParams) {
    const newUser = {
      ...createParams,
      id: uuid.v4(),
    };

    users.push(newUser);
    return newUser;
  }

  findUsers() {
    return users;
  }

  updateUser(id, updateParams) {
    const userInd = users.findIndex((user) => user.id === id);
    if (userInd === -1) {
      return null;
    }

    users[userInd] = {
      ...users[userInd],
      ...updateParams,
    };

    return users[userInd];
  }

  deleteById(id) {
    const userInd = users.findIndex((user) => user.id === id);
    if (userInd === -1) {
      return null;
    }

    const [deletedUser] = users.splice(userInd, 1);
    return deletedUser;
  }
}
exports.userModel = new UserModel();
