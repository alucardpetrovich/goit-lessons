import { userModel } from "../users/user.model.js";
import { mailingHelper } from "../helpers/mailing.js";
import {
  Conflict,
  NotFound,
  Forbidden,
} from "../helpers/error.constructors.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { USER_STATUSES } from "../users/user-statuses.js";

class AuthService {
  async signUp(userParams) {
    // 1. validate req.body +
    // 2. check if user with such email exists +
    // 3. if exists - throw 409 error +
    // 4. if not exists: +
    // 4.1. create hash +
    // 4.2. save user +
    // 4.3. send successful response +

    const { username, email, password } = userParams;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Conflict(`User with email ${email} already exists`);
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const passwordHash = await bcryptjs.hash(password, saltRounds);
    const newUser = await userModel.create({
      username,
      email,
      passwordHash,
    });
    await mailingHelper.sendVerificationEmail(newUser);

    return newUser;
  }

  async signIn(credentials) {
    // 1. validate req.body +
    // 2. check if user with such email exists +
    // 3. if not exist - throw 404 +
    // 4. if exists:
    // 4.1. check password +
    // 4.2. password is wrong - throw 403 +
    // 4.3. password is right:
    // 4.3.1. generate token for user +
    // 4.3.2. send successful response
    const { email, password } = credentials;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new NotFound(`User with email ${email} was not found`);
    }

    const isRightPassword = await bcryptjs.compare(password, user.passwordHash);
    if (!isRightPassword) {
      throw new Forbidden(`Provided password is wrong`);
    }
    if (user.status !== USER_STATUSES.VERIFIED) {
      throw new Conflict("User is not verified");
    }

    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { user, token };
  }

  async verifyEmail(verificationToken) {
    // 1. verify user with verification token
    // 2. if user not updated - throw 404
    // 3. if user verified - send successful response
    const updateResult = await userModel.updateOne(
      { verificationToken },
      {
        status: USER_STATUSES.VERIFIED,
        verificationToken: null,
      }
    );

    if (!updateResult.nModified) {
      throw new NotFound(
        `User not found by verification token '${verificationToken}'`
      );
    }
  }
}

export const authService = new AuthService();
