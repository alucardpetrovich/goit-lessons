const { Conflict, UnprocessableEntity, NotFound } = require("http-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/users.model");
const { getConfig } = require("../../config");

class AuthService {
  async signUp(params) {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. if exists - throw 409 +
    // 4. hash password +
    // 5. save user to DB +
    // 6. send successful response +
    const { email, username, password } = params;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await this.#hashPassword(password);
    const user = await UserModel.create({ email, username, passwordHash });

    return user;
  }

  async signIn(params) {
    // 1. validate req body +
    // 2. find user with such email +
    // 3. if does not exists - throw 422 error +
    // 4. check password +
    // 5. if wrong - throw 422 error +
    // 6. generate JWT-token +
    // 7. send successful response
    const { email, password } = params;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UnprocessableEntity("Login failed");
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new UnprocessableEntity("Login failed");
    }

    const token = this.#createToken(user.id);
    return { user, token };
  }

  async getCurrentUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async #hashPassword(password) {
    const conf = getConfig();
    return bcryptjs.hash(password, conf.bcrypt.saltRounds);
  }

  #createToken(userId) {
    const jwtConf = getConfig().jwt;
    return jwt.sign({ userId }, jwtConf.secret, {
      expiresIn: jwtConf.expiresIn,
    });
  }
}

exports.authService = new AuthService();
