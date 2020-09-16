const { UserModel } = require("./user.model");

exports.createUser = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if user with such email exists +
  // 3. save user +
  // 4. send successful response +
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).send("User with such email already exists");
    }

    const newUser = await UserModel.create(req.body);

    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).send(users);
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(200).send(user);
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).send("User not found");
  }

  res.status(200).send(updatedUser);
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    return res.status(404).send("User not found");
  }

  res.status(204).send();
};
