const {
  Conflict,
  NotFound,
  Forbidden,
  PreconditionFailed,
} = require("http-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");
const { getConfig } = require("../config");
const { mailingClient } = require("../mailing/mailing.client");
const { UserStatuses } = require("../users/user-statuses");

class AuthService {
  async signUp(signUpDto) {
    // 1. validate body +
    // 2. find existing user with such email +
    // 3. throw 409 if user exists +
    // 4. else hash password +
    // 5. save user to db +
    // 6. send successful response +

    const { displayName, email, password } = signUpDto;

    const existingUser = await UserModel.findUser({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await this.hashPassword(password);
    const newUser = await UserModel.createUser({
      email,
      passwordHash,
      displayName,
    });
    await mailingClient.sendVerificationEmail(email, newUser.verificationToken);

    return newUser;
  }

  async signIn(signInDto) {
    // 1. validate req body +
    // 2. find user with email +
    // 3. if user not exist - throw 404 error +
    // 4. else check password
    // 5. if password is wrong - throw 403 error
    // 6. else generate jwt-token
    // 7. send successful response

    const { email, password } = signInDto;
    const user = await UserModel.findUser({ email });
    if (!user) {
      throw new NotFound("User with such email not found");
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Forbidden("Password is wrong");
    }
    if (user.status !== UserStatuses.ACTIVE) {
      throw new PreconditionFailed("User is not verified");
    }

    const token = this.createToken({ sub: user.id });
    return { user, token };
  }

  async verifyUser(verificationToken) {
    const user = await UserModel.findUser({ verificationToken });
    if (!user) {
      throw new NotFound("User not found");
    }

    await UserModel.updateById(user.id, {
      status: UserStatuses.ACTIVE,
      verificationToken: null,
    });
  }

  async hashPassword(password) {
    const { api } = getConfig();
    return bcryptjs.hash(password, api.saltRounds);
  }

  async comparePassword(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  createToken(payload) {
    const config = getConfig();
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}

exports.authService = new AuthService();
