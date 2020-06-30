const { User } = require("./user.model");

exports.createUser = async (req, res, next) => {
  // 1. validate req body +
  // 2. save user to db +
  // 3. send successfull response +

  const newUser = await User.create(req.body);

  console.log(newUser);

  return res.status(201).send(newUser);
};
