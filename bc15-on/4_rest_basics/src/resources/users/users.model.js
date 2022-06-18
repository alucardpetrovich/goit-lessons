const uuid = require("uuid");

const users = [];

class UserModel {
  insertOne(params) {
    const user = {
      ...params,
      id: uuid.v4(),
    };

    users.push(user);
    return user;
  }

  find() {
    return users;
  }

  findById(id) {
    return users.find((user) => user.id === id);
  }

  updateOne(id, params) {
    const ind = users.findIndex((user) => user.id === id);
    if (ind === -1) {
      return;
    }

    users[ind] = {
      ...users[ind],
      ...params,
    };

    return users[ind];
  }

  deleteOne(id) {
    const ind = users.findIndex((user) => user.id === id);
    if (ind === -1) {
      return;
    }

    users.splice(ind, 1);
  }
}

exports.userModel = new UserModel();
