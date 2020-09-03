const { userModel } = require("./user.model");

exports.createUser = (req, res, next) => {
  // 1. validate req body +
  // 2. create unique id for user +
  // 3. save user +
  // 4. send successful response +

  const newUser = userModel.createUser(req.body);

  res.status(201).send(newUser);
};

exports.getUsers = (req, res, next) => {
  const users = userModel.findUsers();

  res.status(200).send(users);
};

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  const user = userModel.findUserById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(200).send(user);
};

exports.updateUser = (req, res, next) => {
  const { userId } = req.params;

  const user = userModel.findUserById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const updatedUser = userModel.updateUser(userId, req.body);

  res.status(200).send(updatedUser);
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;

  const user = userModel.findUserById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  userModel.deleteUserById(userId);

  res.status(204).send();
};
