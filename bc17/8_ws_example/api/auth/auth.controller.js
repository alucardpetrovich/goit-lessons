const bcryptjs = require("bcryptjs");
const userModel = require("../users/user.model");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const {
  UnauthorizedError,
  NotFoundError,
} = require("../helpers/errors.constructors");

class AuthController {
  constructor() {
    this._costFactor = 4;

    this._transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  get signUp() {
    return this._signUp.bind(this);
  }
  get signIn() {
    return this._signIn.bind(this);
  }

  async _signUp(req, res, next) {
    try {
      const { password, username, email } = req.body;
      const passwordHash = await bcryptjs.hash(password, this._costFactor);

      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).send("User with such email already exists");
      }

      const user = await userModel.create({
        username,
        email,
        password: passwordHash,
      });

      await this.sendVerificationEmail(user);

      return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  async _signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const token = await this.checkUser(email, password);

      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async checkUser(email, password) {
    const user = await userModel.findUserByEmail(email);
    if (!user || user.status !== "Verified") {
      throw new UnauthorizedError("Authentication failed");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Authentication failed");
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 2 * 24 * 60 * 60, // two days
    });
    await userModel.updateToken(user._id, token);

    return token;
  }

  async logout(req, res, next) {
    try {
      const user = req.user;
      await userModel.updateToken(user._id, null);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;

      const userToVerify = await userModel.findByVerificationToken(token);
      if (!userToVerify) {
        throw new NotFoundError("User not found");
      }

      await userModel.verifyUser(userToVerify._id);

      return res.status(200).send("You're user successfully verified");
    } catch (err) {
      next(err);
    }
  }

  async authorize(req, res, next) {
    try {
      // 1. витягнути токен користувача з заголовка Authorization
      const authorizationHeader = req.get("Authorization") || "";
      const token = authorizationHeader.replace("Bearer ", "");

      // 2. витягнути id користувача з пейлоада або вернути користувачу
      // помилку зі статус кодом 401
      let userId;
      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET).id;
      } catch (err) {
        next(new UnauthorizedError("User not authorized"));
      }

      // 3. витягнути відповідного користувача. Якщо такого немає - викинути
      // помилку зі статус кодом 401
      // userModel - модель користувача в нашій системі
      const user = await userModel.findById(userId);

      if (!user || user.token !== token) {
        throw new UnauthorizedError("User not authorized");
      }

      // 4. Якщо все пройшло успішно - передати запис користувача і токен в req
      // і передати обробку запиту на наступний middleware
      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }

  async sendVerificationEmail(user) {
    const verificationToken = uuid.v4();

    await userModel.createVerificationToken(user._id, verificationToken);

    await this._transport.sendMail({
      from: process.env.NODEMAILER_USER, // sender address
      to: user.email, // list of receivers
      subject: "Email verification", // Subject line
      html: `<a href='http://localhost:3000/users/verify/${verificationToken}'>Click here</a>`, // plain text body
    });
  }
}

module.exports = new AuthController();
