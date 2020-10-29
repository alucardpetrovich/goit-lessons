const uuid = require("uuid");

const users = [];

exports.saveUser = (userParams) => {
  const newUser = {
    ...userParams,
    id: uuid.v4(),
  };

  users.push(newUser);
  return newUser;
};

exports.findUsers = () => {
  return users;
};

exports.findUserById = (id) => {
  return users.find((user) => user.id === id);
};

exports.modifyUserById = (id, userParams) => {
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

exports.removeUserById = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return;
  }

  users.splice(userIndex, 1);
};
