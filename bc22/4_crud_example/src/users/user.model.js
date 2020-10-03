const uuid = require("uuid");

const users = [];

exports.saveUser = (userParams) => {
  const id = uuid.v4();

  const createdUser = { id, ...userParams };
  users.push(createdUser);

  return createdUser;
};

exports.findUsers = () => {
  return users;
};

exports.findUserById = (id) => {
  return users.find((user) => user.id === id);
};

exports.updateUser = (id, userParams) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...userParams,
  };

  return users[userIndex];
};

exports.removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return;
  }

  users.splice(userIndex, 1);
};
