const { Conflict, NotFound, Forbidden } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { getConfig } = require("../../config");
const { UserModel } = require("../users/user.model");

class AuthService {
  async signUp(userParams) {
    const { username, email, password } = userParams;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await this.hashPassword(password);
    const user = await UserModel.create({ username, email, passwordHash });

    return user;
  }

  async signIn(loginParams) {
    const { email, password } = loginParams;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User not found");
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden("Password is wrong");
    }

    const token = this.createToken(user);

    return { user, token };
  }

  async hashPassword(password) {
    const { bcryptCostFactor } = getConfig();
    return bcryptjs.hash(password, bcryptCostFactor);
  }

  createToken(user) {
    const config = getConfig();
    return jwt.sign({ uid: user.id, permissions: [] }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}

exports.authService = new AuthService();
