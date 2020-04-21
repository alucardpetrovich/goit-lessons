const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const bcryptjs = require("bcryptjs");
const userModel = require("./user.model");
const filmModel = require("../films/films.model");
const jwt = require("jsonwebtoken");
const {
  UnauthorizedError,
  NotFoundError,
} = require("../helpers/errors.constructors");
const {
  Types: { ObjectId },
} = require("mongoose");
const _ = require("lodash");

class UserController {
  constructor() {
    this._costFactor = 4;
  }

  get createUser() {
    return this._createUser.bind(this);
  }
  get getUserById() {
    return this._getUserById.bind(this);
  }
  get getUsers() {
    return this._getUsers.bind(this);
  }
  get getCurrentUser() {
    return this._getCurrentUser.bind(this);
  }
  get removeFilmForUser() {
    return this._removeFilmForUser.bind(this);
  }
  get addFilmForUser() {
    return this._addFilmForUser.bind(this);
  }
  get signIn() {
    return this._signIn
  }

  async _createUser(req, res, next) {
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
    if (!user) {
      throw new UnauthorizedError('Authentication failed');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Authentication failed');
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 2 * 24 * 60 * 60, // two days
    });
    await userModel.updateToken(user._id, token);

    return token;
  }

  async _getUsers(req, res, next) {
    try {
      const users = await userModel.find();

      console.log(this.prepareUsersResponse(users));

      return res.status(200).json(this.prepareUsersResponse(users));
    } catch (err) {
      next(err);
    }
  }

  async _getUserById(req, res, next) {
    try {
      const userId = req.params.id;

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send();
      }

      const [userForResponse] = this.prepareUsersResponse([user]);

      return res.status(200).json(userForResponse);
    } catch (err) {
      next(err);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const userId = req.params.id;

      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).send();
      }

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;

      const userToUpdate = await userModel.findUserByIdAndUpdate(
        userId,
        req.body
      );

      if (!userToUpdate) {
        return res.status(404).send();
      }

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async _addFilmForUser(req, res, next) {
    try {
      const filmId = req.params.id;

      const film = await filmModel.findById(filmId);
      if (!film) {
        throw new NotFoundError("Film does not exists");
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          $push: { favouriteFilmIds: filmId },
        },
        {
          new: true,
        }
      );
      const [updatedUserForResponse] = this.prepareUsersResponse([updatedUser]);

      return res.status(200).json(updatedUserForResponse);
    } catch (err) {
      next(err);
    }
  }

  async _removeFilmForUser(req, res, next) {
    try {
      const filmId = req.params.id;

      const updatedUser = await userModel
        .findByIdAndUpdate(
          req.user._id,
          {
            $pull: { favouriteFilmIds: filmId },
          },
          {
            new: true,
          }
        )
        .populate("favouriteFilmIds");

      // const usersWithFilms = await userModel.aggregate([
      //   { $match: { _id: req.user._id } },
      //   {
      //     $lookup: {
      //       from: "films",
      //       localField: "favouriteFilmIds",
      //       foreignField: "_id",
      //       as: "films",
      //     },
      //   },
      // ]);

      return res.status(200).json(this.prepareUsersResponse([updatedUser]));
    } catch (err) {
      next(err);
    }
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

  async _getCurrentUser(req, res, next) {
    const [userForResponse] = this.prepareUsersResponse([req.user]);

    return res.status(200).json(userForResponse);
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

  validateId(req, res, next) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    next();
  }

  validateRemoveFilmForUser(req, res, next) {
    const validationRules = Joi.object({
      id: Joi.objectId().required(),
    });

    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  validateCreateUser(req, res, next) {
    const validationRules = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  validateUpdateUser(req, res, next) {
    const validationRules = Joi.object({
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    });

    const validationResult = Joi.validate(req.body, validationRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  validateSignIn(req, res, next) {
    const signInRules = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = Joi.validate(req.body, signInRules);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  prepareUsersResponse(users) {
    return users.map((user) => {
      const { username, email, films, _id, favouriteFilmIds } = user;

      return { id: _id, username, email, films, favouriteFilmIds };
    });
  }
}

module.exports = new UserController();
