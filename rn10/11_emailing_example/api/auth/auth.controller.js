import { createControllerProxy } from "../../../5_mongoose_example/api/helpers/controllerProxy";
import { userModel, USER_STATUSES } from "../user/user.model";
import {
  ConflictError,
  UnauthorizedError,
  NotFound,
} from "../helpers/error.constructors";
import bcryptjs from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

class AuthController {
  constructor() {
    this._saltRounds = 5;
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  }

  async registerUser(req, res, next) {
    try {
      // 1. validate request body +
      // 2. check if email exists in collection +
      // 3. hash password +
      // 4. save user to DB +
      // 5. send verification email
      // 6. send response +
      const { username, email, password } = req.body;

      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        throw new ConflictError("User with such email already exists");
      }

      const passwordHash = await this.hashPassword(password);
      const createdUser = await userModel.createUser({
        username,
        email,
        passwordHash,
      });

      this.sendVerificationEmail(createdUser);

      return res.status(201).json({
        user: this.composeUserForResponse(createdUser),
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      // 1. validate request body +
      // 2. fetch user by email from DB +
      // 3. check passwords hash +
      // 4. create session token +
      // 5. send successful response +
      const { email, password } = req.body;

      const user = await userModel.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedError("User does not exist");
      }
      if (user.status !== USER_STATUSES.ACTIVE) {
        throw new UnauthorizedError("User not verified");
      }

      const isPasswordCorrect = await this.comparePasswordHash(
        password,
        user.passwordHash
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedError("User password is not valid");
      }

      const token = this.createToken(user._id);
      await userModel.updateUserById(user._id, { token });

      return res.status(200).json({
        user: this.composeUserForResponse(user),
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      await userModel.updateUserById(req.user._id, { token: null });

      return res.status(204).json();
    } catch (err) {
      next(err);
    }
  }

  async verifyUser(req, res, next) {
    try {
      const { verificationToken } = req.params;

      const userToVerify = await userModel.findByVerificationToken(
        verificationToken
      );
      if (!userToVerify) {
        throw new NotFound("User not found");
      }

      await userModel.verifyUser(verificationToken);

      return res.status(200).send("User successfully verified");
    } catch (err) {
      next(err);
    }
  }

  async authorize(req, res, next) {
    try {
      // 1. get token from header
      // 2. verify jwt token
      // 3. find user by token
      // 4. invoke next middleware

      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        throw new UnauthorizedError("User not authorized");
      }

      const user = await userModel.findUserByToken(token);
      if (!user) {
        throw new UnauthorizedError("Token is not valid");
      }

      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }

  async validateRegisterUser(req, res, next) {
    const userRules = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = Joi.validate(req.body, userRules);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }

  async validateSignIn(req, res, next) {
    const userRules = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = Joi.validate(req.body, userRules);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }

  async hashPassword(password) {
    return bcryptjs.hash(password, this._saltRounds);
  }

  async comparePasswordHash(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  async sendVerificationEmail(user) {
    // 1. generate verification link
    // 2. send email with verification link

    const verificationLink = `${process.env.SERVER_BASE_URL}/auth/verify/${user.verificationToken}`;

    await sgMail.send({
      to: user.email,
      from: process.env.SENDER_EMAIL,
      subject: "Please verify your email",
      html: `<a href="${verificationLink}">Click to verify your email</a>`,
    });
  }

  createToken(uid) {
    return jwt.sign({ uid }, process.env.JWT_SECRET);
  }

  composeUserForResponse(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }
}

export const authController = createControllerProxy(new AuthController());
