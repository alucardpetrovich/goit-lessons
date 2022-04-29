const uuid = require("uuid");

const users = [];

class UserModel {
  insert(userParams) {
    const user = {
      id: uuid.v4(),
      ...userParams,
    };

    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findById(id) {
    return users.find((user) => user.id === id);
  }
}

exports.userModel = new UserModel();
