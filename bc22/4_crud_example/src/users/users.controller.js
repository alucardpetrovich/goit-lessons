const {
  saveUser,
  findUsers,
  findUserById,
  updateUser,
  removeUser,
} = require("./user.model");

exports.createUser = (req, res, next) => {
  // 1. validate req body +
  // 2. create id for new user +
  // 3. save user +
  // 4. send client successful response +

  const newUser = saveUser(req.body);
  res.status(201).send(newUser);
};

exports.getUsers = (req, res, next) => {
  // 1. get users
  // 2. send client successful response

  const users = findUsers();
  res.status(200).send(users);
};

exports.getUserById = (req, res, next) => {
  // 1. get user by id
  // 2. if user not found - throw 404
  // 3. if ok - send client successful response
  const { id } = req.params;

  const user = findUserById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.status(200).send(user);
};

exports.updateUser = (req, res, next) => {
  // 1. validate req body +
  // 2. find user +
  // 3. if no user - throw 404 +
  // 4. if ok - update user +
  // 5. and send client successful response
  const { id } = req.params;

  const user = findUserById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const updatedUser = updateUser(id, req.body);

  return res.status(200).send(updatedUser);
};

exports.deleteUser = (req, res, next) => {
  // 1. find user by id +
  // 2. if no user - throw 404 +
  // 3. if ok - delete user
  // 4. and send client successful response
  const { id } = req.params;

  const user = findUserById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  removeUser(id);

  return res.status(204).send();
};
