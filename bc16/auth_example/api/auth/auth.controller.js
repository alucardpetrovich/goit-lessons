import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model";
import {
  ConflictError,
  ValidationError,
  UnauthorizedError
} from "../helpers/errorConstructors";
import { sessionModel } from "../session/session.model";
import { config } from "../config";

class AuthController {
  constructor() {
    this._saltRounds = 4;
  }

  get validateSignUp() {
    return this._validateSignUp.bind(this);
  }
  get signUp() {
    return this._signUp.bind(this);
  }
  get createSession() {
    return this._createSession.bind(this);
  }
  get authorize() {
    return this._authorize.bind(this);
  }
  get signOut() {
    return this._signOut.bind(this);
  }

  async _signUp(req, res, next) {
    try {
      // 1. check email for uniqueness +
      // 2. 409 if user with email exists +
      // 3. hash password
      // 4. create user

      const { username, password, email } = req.body;

      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        throw new ConflictError("User with such email already exists");
      }

      const passwordHash = await this.createHash(password);

      const newUser = await userModel.createUser(username, email, passwordHash);

      return res.status(201).json({
        id: newUser._id,
        username: newUser.username
      });
    } catch (err) {
      next(err);
    }
  }

  async _createSession(req, res, next) {
    try {
      // 1. take user from req.user (passport put it there)
      // 2. create session for authenticated user
      // 3. create token for this session

      const user = req.user;
      const session = await sessionModel.createSession(user._id);
      const sessionToken = await this.createToken(session._id);

      return res.status(201).json({
        token: sessionToken
      });
    } catch (err) {
      next(err);
    }
  }

  async _signOut(req, res, next) {
    try {
      const { _id: sessionId } = req.session;
      await sessionModel.disableSession(sessionId);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async _authorize(req, res, next) {
    try {
      // 1. get user token from request
      // 2. verify jwt token
      // 3. check session and user in DB
      // 4. call next()

      const authorizationHeader = req.get("Authorization");
      const token = authorizationHeader.replace("Bearer ", "");

      try {
        const { sessionId } = await jwt.verify(token, config.jwtSecret);

        const sessionWithUser = await sessionModel.getSessionByIdWithUser(
          sessionId
        );

        console.log("sessionWithUser", sessionWithUser);

        if (!sessionWithUser || sessionWithUser.status === "disabled") {
          throw new UnauthorizedError();
        }

        req.user = sessionWithUser.user;
        req.session = sessionWithUser;

        next();
      } catch (err) {
        console.log(err);
        next(new UnauthorizedError("User not authorized"));
      }
    } catch (err) {
      next(err);
    }
  }

  _validateSignUp(req, res, next) {
    try {
      const signUpRules = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      });

      const result = Joi.validate(req.body, signUpRules);

      if (result.error) {
        throw new ValidationError(result.error.message);
      }

      next();
    } catch (err) {
      next(err);
    }
  }

  async createHash(password) {
    return bcrypt.hash(password, this._saltRounds);
  }

  async createToken(sessionId) {
    return jwt.sign({ sessionId }, config.jwtSecret, { expiresIn: "1h" });
  }
}

export const authController = new AuthController();
