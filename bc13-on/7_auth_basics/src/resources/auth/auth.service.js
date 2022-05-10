const { UserModel } = require("../users/users.model");
const { Conflict, NotFound, Forbidden } = require("http-errors");
const { getConfig } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  async signUp(userParams) {
    const { username, email, password } = userParams;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    return UserModel.create({
      username,
      email,
      passwordHash: await this.#hashPassword(password),
    });
  }

  async signIn(credentials) {
    const { email, password } = credentials;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User not found");
    }
    const isPasswordCorrect = await this.#isPasswordCorrect(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden("Password is wrong");
    }

    const token = this.#generateToken(user.id);
    return { user, token };
  }

  async #hashPassword(password) {
    const config = getConfig();
    return bcrypt.hash(password, config.bcrypt.saltRounds);
  }

  async #isPasswordCorrect(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  #generateToken(userId) {
    const config = getConfig();
    return jwt.sign({ sub: userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}

exports.authService = new AuthService();
