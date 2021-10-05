const {
  Conflict,
  NotFound,
  Forbidden,
  PreconditionFailed,
} = require("http-errors");
const { UserModel } = require("../users/user.model");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { mailingClient } = require("../helpers/mailing.client");
const { userStatuses } = require("../users/user-statuses");

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
      verificationToken: uuid.v4(),
    });
    await mailingClient.sendVerificationEmail(
      newUser.email,
      newUser.verificationToken
    );

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
    if (user.status === userStatuses.NON_VERIFIED) {
      throw new PreconditionFailed(`User haven't verified email address`);
    }

    const isPasswordCorrect = await UserModel.isPasswordCorrect(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden(`Provided password is wrong`);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_AT,
    });

    return { user, token };
  }

  async verifyEmail(verificationToken) {
    const user = await UserModel.findOneAndUpdate(
      { verificationToken },
      { status: userStatuses.ACTIVE, verificationToken: null }
    );

    if (!user) {
      throw new NotFound(
        `User with verification token '${verificationToken}' was not found`
      );
    }
  }
}

exports.authService = new AuthService();
