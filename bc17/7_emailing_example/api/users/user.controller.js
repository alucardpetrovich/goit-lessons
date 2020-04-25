const userModel = require("./user.model");
const filmModel = require("../films/films.model");
const { NotFoundError } = require("../helpers/errors.constructors");

class UserController {
  constructor() {}

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

      const updatedUser = await userModel.addFavouriteFilm(
        req.user._id,
        filmId
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

      const updatedUser = await userModel.removeFavouriteFilm(
        req.user._id,
        filmId
      );

      return res.status(200).json(this.prepareUsersResponse([updatedUser]));
    } catch (err) {
      next(err);
    }
  }

  async _getCurrentUser(req, res, next) {
    const [userForResponse] = this.prepareUsersResponse([req.user]);

    return res.status(200).json(userForResponse);
  }

  prepareUsersResponse(users) {
    return users.map((user) => {
      const { username, email, films, _id, favouriteFilmIds } = user;

      return { id: _id, username, email, films, favouriteFilmIds };
    });
  }
}

module.exports = new UserController();
