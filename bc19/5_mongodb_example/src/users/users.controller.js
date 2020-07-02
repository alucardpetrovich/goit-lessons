const { User } = require("./user.model");

exports.createUser = async (req, res, next) => {
  // 1. validate req body +
  // 2. save user to db +
  // 3. send successfull response +

  const newUser = await User.create(req.body);

  return res.status(201).send(newUser);
};

exports.getUsers = async (req, res, next) => {
  // 1. get users from database
  // 2. send client successfull response

  const users = await User.find();
  throw new Error();
  return res.status(200).send(users);
};

exports.getUser = async (req, res, next) => {
  // 1. get user from db
  // 2. if user is not present - throw 404 error
  // 3. send client successfull response

  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send("User does not exist");
  }

  return res.status(200).send(user);
};

exports.updateUser = async (req, res) => {
  // 1. validate req params +
  // 2. update user +
  // 3. return 404 if user does not exist +
  // 4. send client successfull response +

  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).send("User does not exist");
  }

  return res.status(200).send(updatedUser);
};

exports.deleteUser = async (req, res) => {
  // 1. validate req params +
  // 2. delete user +
  // 3. if user does not exist - return 404 error +
  // 4. send client successfull response +

  const deletedUser = await User.findByIdAndRemove(req.params.id);
  if (!deletedUser) {
    return res.status(404).send("User does not exist");
  }

  return res.status(204).send();
};
