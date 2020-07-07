const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../users/user.model");

const saltRounds = 7;

exports.signUp = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if user with such email exists +
  // 3. if exists - throw 409 error +
  // 4. if not exists - create new user +
  // 5. return successfull response 201

  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send("User with such email already exists");
  }

  const passwordHash = await bcryptjs.hash(password, saltRounds);

  const newUser = await User.create({
    username,
    email,
    passwordHash,
  });

  return res.status(201).send({
    id: newUser._id,
    username,
    email,
  });
};

exports.signIn = async (req, res, next) => {
  // 1. validate req body +
  // 2. find user with provided email +
  // 3. if user not found - throw 401 error +
  // 4. compare provided password and DB passwordHash +
  // 5. if password is incorrect - throw 401 error +
  // 6. generate auth token +
  // 7. return successfull response +

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Authentication failed");
  }

  const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).send("Authentication failed");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(200).send({ token });
};
