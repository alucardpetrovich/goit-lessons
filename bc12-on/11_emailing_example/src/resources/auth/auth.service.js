const {
  Conflict,
  NotFound,
  Forbidden,
  PreconditionFailed,
  Gone,
} = require("http-errors");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { getConfig } = require("../../config");
const { UserModel } = require("../users/user.model");
const { USER_STATUSES } = require("../users/user-statuses");
const { mailingClient } = require("../../shared/mailer");
const uuid = require("uuid");

class AuthService {
  async signUp(userParams) {
    const { username, email, password } = userParams;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await this.hashPassword(password);
    const user = await UserModel.create({
      username,
      email,
      passwordHash,
      verificationToken: uuid.v4(),
    });
    await this.sendVerificationEmail(user);

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
    if (user.status !== USER_STATUSES.ACTIVE) {
      throw new PreconditionFailed("User is not verified");
    }

    const token = this.createToken(user);

    return { user, token };
  }

  async verifyUser(verificationToken) {
    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
      throw new Gone("Verification link is not valid or already used");
    }

    await UserModel.updateOne(
      { verificationToken },
      { verificationToken: null, status: USER_STATUSES.ACTIVE }
    );
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

  async sendVerificationEmail(user) {
    const verificationUrl = `${getConfig().baseUrl}/api/auth/verify/${
      user.verificationToken
    }`;

    return mailingClient.sendVerificationEmail(user.email, verificationUrl);
  }
}

exports.authService = new AuthService();
