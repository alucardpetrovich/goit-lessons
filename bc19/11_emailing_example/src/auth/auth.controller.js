// 1. add verification field to User model +
// 2. send verification email after new user creation +
// 3. create verification endpoint +
// 4. forbid sign-in for non-verified users +

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { User } = require("../users/user.model");
const { emailingClient } = require("./emailing.client");

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
    verificationToken: uuid.v4(),
  });

  await sendVerificationEmail(newUser);

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

  if (user.verificationToken) {
    return res.status(401).send("user is not verified");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, { httpOnly: true });
  return res.status(200).send({ token });
};

exports.getLoggedUser = (req, res) => {
  return res.status(200).send(req.user);
};

exports.verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
    }
  );

  if (!user) {
    return res.status(404).send("User not found or already verified");
  }

  return res.status(204).send();
};

async function sendVerificationEmail(user) {
  const { email, verificationToken } = user;

  const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
  await emailingClient.sendVerificationEmail(email, verificationLink);
}
