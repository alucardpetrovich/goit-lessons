const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");
const { Conflict, NotFound, Forbidden } = require("http-errors");

class AuthService {
  async signUp(userParams) {
    // 1. validate body +
    // 2. find user with same email +
    // 3. if user exists - throw 409 error +
    // 4. hash password +
    // 5. create new User +
    // 6. return successful response +
    const { email, password, username } = userParams;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`user with email '${email}' already exists`);
    }

    const passwordHash = await this.createHash(password);
    const newUser = await UserModel.create({
      email,
      username,
      passwordHash,
    });

    return newUser;
  }

  async signIn(signInParams) {
    // 1. validate body +
    // 2. find user by email +
    // 3. if user not exist - throw 404 +
    // 4. compare passwords +
    // 5. if wrong password - throw 403 +
    // 6. create token +
    // 7. send successful response +
    const { email, password } = signInParams;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with email '${email}' does not exist`);
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Forbidden("Provided password is wrong");
    }

    const token = this.createToken(user._id);

    return { user, token };
  }

  async createHash(password) {
    const { SALT_ROUNDS } = process.env;
    return bcryptjs.hash(password, parseInt(SALT_ROUNDS));
  }

  async comparePasswords(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  createToken(userId) {
    const { JWT_EXPIRES_AT, JWT_SECRET } = process.env;

    return jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_AT });
  }
}

exports.authService = new AuthService();
