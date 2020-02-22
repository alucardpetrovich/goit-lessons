const Validator = require("node-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ValidationError,
  ConflictError,
  UnauthorizedError
} = require("../helpers/errors.constructor");
const { UserModel } = require("../user/user.model");
const { createControllerProxy } = require("../helpers/proxies");
const { SessionModel } = require("../session/session.model");
const { jwtSecret, sessionExpiresTime } = require("../config");

class AuthController {
  async signUpPlain(req, res) {
    // 1. check if user with such email exists
    // 2. if user does not exist - create new
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      throw new ConflictError(`User with email ${email} exists`);
    }

    const passwordHash = await bcrypt.hash(password, 4);
    const userBody = {
      name,
      email,
      passwordHash
    };

    const newUser = await UserModel.createUser(userBody);

    return res.status(201).send({
      id: newUser._id
    });
  }

  async createSession(req, res) {
    // 1. create session for authorized user
    // 2. generate token
    // 3. send token to user
    const session = await SessionModel.createSession(req.user._id);

    const token = await jwt.sign(
      {
        id: session._id
      },
      jwtSecret,
      { expiresIn: sessionExpiresTime }
    );

    return res.status(201).send({
      token
    });
  }

  async signOut(req, res) {
    const { _id: sessionId } = req.session;

    await SessionModel.disableSession(sessionId);

    return res.status(204).send();
  }

  async authorize(req, res, next) {
    const authHeader = req.get("Authorization");
    const token = authHeader.replace("Bearer ", "");

    let sessionId;
    try {
      const { id } = await jwt.verify(token, jwtSecret);
      sessionId = id;
    } catch (err) {
      throw new UnauthorizedError(err);
    }

    const session = await SessionModel.getSessionById(sessionId);
    if (session.status === "Disabled") {
      throw new UnauthorizedError("Session is disabled");
    }

    req.user = session.user;
    req.session = session;

    next();
  }

  validateSignUpPlain(req, res, next) {
    const signUpRules = Validator.isObject()
      .withRequired("name", Validator.isString())
      .withRequired("email", Validator.isString({ regex: /@/ }))
      .withRequired("password", Validator.isString());

    Validator.run(signUpRules, req.body, (errorCount, errors) => {
      if (!errorCount) return next();
      next(new ValidationError(JSON.stringify(errors)));
    });
  }

  validateSignInPlain(req, res, next) {
    const signInRules = Validator.isObject()
      .withRequired("email", Validator.isString({ regex: /@/ }))
      .withRequired("password", Validator.isString());

    Validator.run(signInRules, req.body, (errorCount, errors) => {
      if (!errorCount) return next();
      next(new ValidationError(JSON.stringify(errors)));
    });
  }
}

module.exports = createControllerProxy(new AuthController());
