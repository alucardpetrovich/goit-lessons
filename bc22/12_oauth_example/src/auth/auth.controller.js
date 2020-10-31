const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Conflict } = require("../helpers/errors/Conflict.error");
const { NotFound } = require("../helpers/errors/NotFound.error");
const { Forbidden } = require("../helpers/errors/Forbidden.error");
const { UserModel } = require("../users/user.model");

exports.signUp = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. if exists - throw 409 error +
    // 4. create password hash +
    // 5. create new user +
    // 6. send successful response +
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await UserModel.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).send({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  // 1. validate req body +
  // 2. find user with provided email +
  // 3. if not found - throw 404 +
  // 4. compare password with existing hash +
  // 5. if password is wrong - throw 403 +
  // 6. generate auth token +
  // 7. send successful response +
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User with such email not found");
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      user.passwordHash
    );
    if (!isCorrectPassword) {
      throw new Forbidden("Provided password is wrong");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, { httpOnly: true });

    // Set-Cookie: token=<value>;httpOnly

    return res.status(200).send({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
