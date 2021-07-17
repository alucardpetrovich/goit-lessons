const { Conflict, NotFound, Forbidden } = require("http-errors");
const { UserModel } = require("../users/user.model");
const jwt = require("jsonwebtoken");
const { TOKEN_TYPES } = require("./token-types");
const { UsedTokenModel } = require("./used-token.model");

class AuthService {
  async signUp(userCreateParams) {
    // 1. validate req body +
    // 2. find user with provided email +
    // 3. if such user exists - throw 409 (Conflict) error +
    // 4. hash password
    // 5. save user
    // 6. send successful response to client
    const { username, email, password } = userCreateParams;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`User with email '${email}' already exists`);
    }

    const newUser = await UserModel.create({
      username,
      email,
      passwordHash: await UserModel.hashPassword(password),
    });

    return newUser;
  }

  async signIn(signInParams) {
    // 1. validate req body +
    // 2. find user with email +
    // 3. if user does not exist - throw 404 (NotFound) error +
    // 4. check password +
    // 5. if password is wrong - throw 403 (Forbidden) error +
    // 6. create authorization token
    // 7. send successful response to client
    const { email, password } = signInParams;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with email '${email}' not found`);
    }

    const isPasswordCorrect = await UserModel.isPasswordCorrect(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden(`Provided password is wrong`);
    }

    return {
      user,
      tokens: this.createTokens(user),
    };
  }

  async refreshTokens({ refresh }) {
    let payload;
    try {
      payload = jwt.verify(refresh, process.env.JWT_SECRET);
      if (payload.type !== TOKEN_TYPES.REFRESH) {
        throw new Error();
      }
    } catch (err) {
      throw new Forbidden(`Refresh token is not valid`);
    }

    const usedToken = await UsedTokenModel.findOne({ token: refresh });
    if (usedToken) {
      throw new Forbidden(`Refresh token was already used`);
    }

    const userId = payload.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    await UsedTokenModel.create({
      token: refresh,
      expiresAt: new Date(payload.exp * 1000),
    });

    return this.createTokens(user);
  }

  async removeUsedTokens() {
    await UsedTokenModel.deleteMany({ expiresAt: { $lte: new Date() } });
  }

  createTokens(user) {
    return {
      session: this.createToken(
        user,
        TOKEN_TYPES.SESSION,
        process.env.SESSION_TOKEN_EXPIRES_IN
      ),
      refresh: this.createToken(
        user,
        TOKEN_TYPES.REFRESH,
        process.env.REFRESH_TOKEN_EXPIRES_IN
      ),
    };
  }

  createToken(user, type, expiresIn) {
    return jwt.sign({ id: user._id, type }, process.env.JWT_SECRET, {
      expiresIn,
    });
  }
}

exports.authService = new AuthService();
