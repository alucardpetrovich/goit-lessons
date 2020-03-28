const Joi = require("joi");

const users = [
  {
    id: 1,
    name: "Richard",
    email: "richard@email.com",
    password: "qwerty"
  }
];

class UserController {
  get createUser() {
    return this._createUser.bind(this);
  }
  get updateUser() {
    return this._updateUser.bind(this);
  }
  get deleteUser() {
    return this._deleteUser.bind(this);
  }

  getUsers(req, res, next) {
    return res.json(users);
  }

  _createUser(req, res, next) {
    const newUser = {
      ...req.body,
      id: users.length + 1
    };

    users.push(newUser);

    console.log("users", users);

    return res.send();
  }

  async _updateUser(req, res, next) {
    try {
      const targetUserIndex = this.findUserIndexById(res, req.params.id);

      users[targetUserIndex] = {
        ...users[targetUserIndex],
        ...req.body
      };

      console.log("users", users);

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async _deleteUser(req, res, next) {
    try {
      const targetUserIndex = this.findUserIndexById(res, req.params.id);

      users.splice(targetUserIndex, 1);

      console.log("users", users);

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  findUserIndexById(res, userId) {
    const id = parseInt(userId);

    const targetUserIndex = users.findIndex(user => user.id === id);
    if (targetUserIndex === -1) {
      throw new NotFoundError("User not found");
    }

    return targetUserIndex;
  }

  validateCreateUser(req, res, next) {
    const createUserRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    });

    const result = Joi.validate(req.body, createUserRules);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    next();
  }

  validateUpdateUser(req, res, next) {
    const updateUserRules = Joi.object({
      name: Joi.string(),
      email: Joi.string()
    });

    const result = Joi.validate(req.body, updateUserRules);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    next();
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.status = 404;
    delete this.stack;
  }
}

module.exports = new UserController();
