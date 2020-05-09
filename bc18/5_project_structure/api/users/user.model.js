const uuid = require("uuid");

// id - string
// username - string
// email - string
// password - string

const usersDB = [];

exports.createUser = function createUser(userParams) {
  const id = uuid.v4();

  const createdUser = {
    ...userParams,
    id,
  };

  usersDB.push(createdUser);

  return createdUser;
};

exports.getAllUsers = function getAllUsers() {
  return usersDB;
};

exports.getUserById = function getUserById(userId) {
  return usersDB.find((user) => user.id === req.params.id);
};

exports.updateUser = function updateUser(userId, userParams) {
  const foundUserIndex = usersDB.findIndex((user) => user.id === userId);
  if (foundUserIndex === -1) {
    return;
  }

  usersDB[foundUserIndex] = {
    ...usersDB[foundUserIndex],
    ...userParams,
  };

  return usersDB[foundUserIndex];
};

exports.deleteUser = function deleteUser(userId) {
  const foundUserIndex = usersDB.findIndex((user) => user.id === userId);
  if (foundUserIndex === -1) {
    return;
  }

  usersDB.splice(userIndexFound, 1);
};
