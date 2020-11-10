const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");
const { Conflict, NotFound, Forbidden } = require("../helpers/errors");

exports.signUp = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. find existing user with such email +
    // 3. if user exists - throw 409 error +
    // 4. hash password +
    // 5. save user in DB +
    // 6. send successful response +
    const { email, password, username } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    const newUser = await UserModel.create({ email, username, passwordHash });

    res.status(201).send({ id: newUser._id, username, email });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. find user with provided email +
    // 3. if user not found - throw 404 error +
    // 4. compare password with passwordHash from DB +
    // 5. if comparison failed - throw 403 error +
    // 6. create token +
    // 7. send successful response +
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User with such email not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Forbidden("Password is not correct");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await UserModel.findByIdAndUpdate(user._id, { $push: { tokens: token } });

    return res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
