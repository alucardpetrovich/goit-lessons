import Joi from "joi";
import bcrypt from "bcrypt";
import { userModel } from "../user/user.model";
import { ConflictError, ValidationError } from "../helpers/errorConstructors";

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
}

export const authController = new AuthController();
