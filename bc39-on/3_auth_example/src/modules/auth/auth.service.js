const { UserModel } = require("../users/user.model");
const {
  Conflict,
  UnprocessableEntity,
  Forbidden,
  Gone,
  PreconditionRequired,
} = require("http-errors");
const bcrypt = require("bcryptjs");
const { getConfig } = require("../../config");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { TOKEN_TYPES } = require("../../shared/constants");
const { verifyJwt } = require("../../shared/jwt-verify");
const { revokedTokensRepository } = require("./revoked-tokens.repository");
const otpGenerator = require("otp-generator");
const { twoFaCodesRepository } = require("./2fa-codes.repository");
const { twilioClient } = require("../../shared/twilio-client");

class AuthService {
  async signUp(userParams) {
    const { username, phoneNumber, password } = userParams;

    const existingUser = await UserModel.findOne({ phoneNumber });
    if (existingUser) {
      throw new Conflict(
        `User with phone number "${phoneNumber}" already exists`
      );
    }

    return UserModel.create({
      username,
      phoneNumber,
      passwordHash: await this.#hashPassword(password),
    });
  }

  async signIn(signInParams) {
    const { phoneNumber, password, twoFaCode } = signInParams;

    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      throw new UnprocessableEntity("User creds are wrong");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new UnprocessableEntity("User creds are wrong");
    }
    if (user.twoFaEnabled) {
      const isCodeCorrect = await twoFaCodesRepository.isCodeCorrect(
        user._id,
        twoFaCode
      );
      if (!isCodeCorrect) {
        throw new PreconditionRequired("User creds are wrong");
      }

      await twoFaCodesRepository.deleteCode(user._id, twoFaCode);
    }

    // const token = this.#generateToken(user._id);
    const tokens = this.#generateTokensPair(user._id);

    return { user, tokens };
  }

  async refreshTokens({ refreshToken }) {
    const { type, pairId, userId } = verifyJwt(refreshToken);
    if (type !== TOKEN_TYPES.REFRESH) {
      throw new Forbidden("Wrong token type");
    }

    const isRevoked = await revokedTokensRepository.isRevoked(pairId);
    if (isRevoked) {
      throw new Gone("Token is revoked");
    }

    await revokedTokensRepository.setAsRevoked(pairId);

    return this.#generateTokensPair(userId);
  }

  async getCurrentUser(userId) {
    return UserModel.findById(userId);
  }

  async send2FaCode({ phoneNumber }) {
    const user = await UserModel.findOne({ phoneNumber });
    if (!user || !user.twoFaEnabled) {
      return;
    }

    const code = this.#generateOtpCode();
    await twoFaCodesRepository.setCode(user._id, code);

    await twilioClient.sendSms(
      user.phoneNumber,
      `Your authentication code is ${code}`
    );
  }

  async #hashPassword(password) {
    const { bcryptCostFactor } = getConfig();
    return bcrypt.hash(password, bcryptCostFactor);
  }

  #generateToken(userId) {
    const { jwt: jwtConfig } = getConfig();
    return jwt.sign({ userId }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }

  #generateTokensPair(userId) {
    const { jwt: jwtConfig } = getConfig();
    const commonPayload = { userId, pairId: uuid.v4() };

    const accessToken = jwt.sign(
      { ...commonPayload, type: TOKEN_TYPES.ACCESS },
      jwtConfig.secret,
      { expiresIn: jwtConfig.accessExpiresIn }
    );
    const refreshToken = jwt.sign(
      { ...commonPayload, type: TOKEN_TYPES.REFRESH },
      jwtConfig.secret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    return { access: accessToken, refresh: refreshToken };
  }

  #generateOtpCode() {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
  }
}

exports.authService = new AuthService();
