const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../users/user.model");

exports.signUp = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if client provided unique email (throw 409 if not unique) +
  // 3. hash password +
  // 4. save user to DB +
  // 5. send successfull response

  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send(`User with email ${email} already exists`);
    }

    const passwordHash = await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    const newUser = await UserModel.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).send({
      id: newUser._id,
      username,
      email,
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if user with email exists (throw 404 if not) +
  // 3. check password (throw 403 if password does not match) +
  // 4. generate token +
  // 5. send successfull response
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(403).send("Password is wrong");
  }

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).send({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
};
