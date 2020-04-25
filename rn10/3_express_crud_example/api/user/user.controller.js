import Joi from "joi";
import { v4 } from "uuid";
import { NotFound } from "../helpers/error.constructors";
import { createControllerProxy } from "../helpers/controllerProxy";

const usersDB = [];

class UserController {
  createUser(req, res, next) {
    try {
      // 1. validate req body
      // 2. create unique id for new user
      // 3. write user to usersDB
      // 4. send success response
      const id = v4();

      const newUser = {
        ...req.body,
        id,
      };

      usersDB.push(newUser);

      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  getAllUsers(req, res, next) {
    return res.status(200).json(usersDB);
  }

  getUser(req, res, next) {
    // 1. get user id from path params
    // 2. get user from userDB by id
    // 3. if user not found - return 404
    // 4. return found user
    try {
      const { id } = req.params;

      const foundUser = this.getUserFromArray(id);

      return res.status(200).json(foundUser);
    } catch (err) {
      next(err);
    }
  }

  updateUser(req, res, next) {
    // 1. validate req body
    // 2. get user id from path params
    // 3. get user from userDB by id
    // 4. if user not found - return 404
    // 5. update user info
    // 6. return successfull response

    try {
      const { id } = req.params;

      const foundUser = this.getUserFromArray(id);

      const foundUserIndex = this.getUserIndexFromArray(id);
      const updatedUser = {
        ...foundUser,
        ...req.body,
      };
      usersDB[foundUserIndex] = updatedUser;

      return res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  deleteUser(req, res, next) {
    // 1. get user id from path params
    // 2. get user from userDB by id
    // 3. if user not found - return 404
    // 4. if user found delete user from DB
    // 5. return successfull response

    try {
      const { id } = req.params;

      const foundUserIndex = this.getUserIndexFromArray(id);

      usersDB.splice(foundUserIndex, 1);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  getUserFromArray(userId) {
    const userFound = usersDB.find((user) => user.id === userId);
    if (!userFound) {
      throw new NotFound("User not found");
    }

    return userFound;
  }

  getUserIndexFromArray(userId) {
    const userFound = usersDB.findIndex((user) => user.id === userId);
    if (!userFound) {
      throw new NotFound("User not found");
    }

    return userFound;
  }

  validateCreateUser(req, res, next) {
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

  validateUpdateUser(req, res, next) {
    const userRules = Joi.object({
      username: Joi.string(),
      email: Joi.string(),
    });

    const validationResult = Joi.validate(req.body, userRules);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }
}

export const userController = createControllerProxy(new UserController());
