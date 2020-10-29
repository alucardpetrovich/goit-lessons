const {
  saveUser,
  findUsers,
  findUserById,
  modifyUserById,
  removeUserById,
} = require("./users.model");
const _ = require("lodash");

exports.createUser = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. create uuid for user +
    // 3. save user +
    // 4. send user successful response +

    const newUser = saveUser(req.body);

    return res.status(201).send(composeUsers(newUser));
  } catch (err) {
    next(err);
  }
};

exports.getUsers = (req, res, next) => {
  try {
    const users = findUsers();
    return res.status(200).send(composeUsers(users));
  } catch (err) {
    next(err);
  }
};

exports.getUserById = (req, res, next) => {
  try {
    // 1. find user in DB +
    // 2. if user is not found - throw 404 error +
    // 3. return successful response +

    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(composeUsers(user));
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. find user by id +
    // 3. if user is not found - throw 404 error +
    // 4. update user +
    // 5. return successful response +
    const { id } = req.params;

    const user = findUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedUser = modifyUserById(id, req.body);

    return res.status(200).send(composeUsers(updatedUser));
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const {id} = req.params;

    const user = findUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    removeUserById(id);

    return res.status(204).send();
  } catch(err) {
    next(err);
  }
}

function composeUsers(userOrUsers) {
  if (!(userOrUsers instanceof Array)) {
    return _.omit(userOrUsers, "password");
  }

  return userOrUsers.map((user) => _.omit(user, "password"));
}
