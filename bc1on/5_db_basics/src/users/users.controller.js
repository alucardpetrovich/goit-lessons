const { UserModel } = require("./users.model");
const _ = require("lodash");

exports.createUser = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. create uuid for user +
    // 3. save user +
    // 4. send user successful response +

    const newUser = await UserModel.create(req.body);

    return res.status(201).send(composeUsers(newUser));
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.status(200).send(composeUsers(users));
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    // 1. find user in DB +
    // 2. if user is not found - throw 404 error +
    // 3. return successful response +

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(composeUsers(user));
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. find user by id +
    // 3. if user is not found - throw 404 error +
    // 4. update user +
    // 5. return successful response +
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(composeUsers(user));
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

function composeUsers(userOrUsers) {
  if (!(userOrUsers instanceof Array)) {
    return _.omit(userOrUsers, "password");
  }

  return userOrUsers.map((user) => _.omit(user, "password"));
}
