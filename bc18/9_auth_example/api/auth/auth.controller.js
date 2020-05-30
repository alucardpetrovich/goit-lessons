import Joi from "@hapi/joi";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/users.model";
import { Conflict, Unauthorized } from "../helpers/errorConstructors";
import { createControllerProxy } from "../helpers/controllerProxy";

export class AuthController {
  async signUp(req, res, next) {
    try {
      // 1. validate body +
      // 2. get existing user with such email +
      // 3. if user exists - throw 409 error +
      // 4. create passwordHash +
      // 5. save user to DB +
      // 6. send successfull response
      const { username, email, password } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        throw new Conflict("User with such email already exists");
      }

      const passwordHash = await this.createHash(password);

      const newUser = await UserModel.createUser(username, email, passwordHash);

      return res.status(201).json({
        id: newUser._id,
        username,
        email,
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      // 1. validate request body +
      // 2. find user by email +
      // 3. if no user - throw 401 error +
      // 4. compare password with DB passwordHash +
      // 5. if comparison failed - throw 401 +
      // 6. generate auth token +
      // 7. save token for user +
      // 8. save to cookies +
      // 9. send successfull response +
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new Unauthorized("Authentication failed");
      }

      const isPasswordValid = await this.comparePasswords(
        password,
        user.passwordHash
      );
      if (!isPasswordValid) {
        throw new Unauthorized("Authentication failed");
      }

      const authToken = this.createToken(user);

      await UserModel.updateUser(user._id, { token: authToken });

      res.cookie("token", authToken, { httpOnly: true });

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    const { _id: userId } = req.user;

    await UserModel.updateUser(userId, { token: null });
    res.cookie("token", null, { httpOnly: true });

    return res.status(204).send();
  }

  async authorize(req, res, next) {
    try {
      // 1. Get token from cookies +
      // 2. Check if token is valid jwt +
      // 3. Check if user with such token exists +
      // 4. Set user in req object
      // 5. pass control to next middleware

      const { token } = req.cookies;

      try {
        this.verifyToken(token);
      } catch (err) {
        throw new Unauthorized("Authorization failed");
      }

      const user = await UserModel.findByToken(token);
      if (!user) {
        throw new Unauthorized("Authorization failed");
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  }

  validateSignUp(req, res, next) {
    const newUserParamsSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = newUserParamsSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }

  validateSignIn(req, res, next) {
    const signInSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = signInSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }

  async createHash(password) {
    const BCRYPTJS_SALT_ROUNDS = +process.env.BCRYPTJS_SALT_ROUNDS;
    return bcryptjs.hash(password, BCRYPTJS_SALT_ROUNDS);
  }

  async comparePasswords(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  createToken(user) {
    const tokenPayload = { uid: user._id };
    const { JWT_SECRET, JWT_EXIRES_IN } = process.env;

    return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXIRES_IN });
  }

  verifyToken(token) {
    const { JWT_SECRET } = process.env;

    return jwt.verify(token, JWT_SECRET);
  }
}

export const authController = createControllerProxy(new AuthController());
