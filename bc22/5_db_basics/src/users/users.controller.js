const { UserModel } = require("./user.model");

exports.createUser = async (req, res, next) => {
  // 1. validate req body +
  // 2. create id for new user +
  // 3. save user +
  // 4. send client successful response +

  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  // 1. get users
  // 2. send client successful response

  const users = await UserModel.find();
  res.status(200).send(users);
};

exports.getUserById = async (req, res, next) => {
  // 1. get user by id
  // 2. if user not found - throw 404
  // 3. if ok - send client successful response
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.status(200).send(user);
};

exports.updateUser = async (req, res, next) => {
  // 1. validate req body +
  // 2. find user +
  // 3. if no user - throw 404 +
  // 4. if ok - update user +
  // 5. and send client successful response
  const { id } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).send("User not found");
  }

  return res.status(200).send(updatedUser);
};

exports.deleteUser = async (req, res, next) => {
  // 1. find user by id +
  // 2. if no user - throw 404 +
  // 3. if ok - delete user
  // 4. and send client successful response
  const { id } = req.params;

  const deleteResult = await UserModel.deleteOne({ _id: id });
  if (!deleteResult.deletedCount) {
    return res.status(404).send("User not found");
  }

  return res.status(204).send();
};
