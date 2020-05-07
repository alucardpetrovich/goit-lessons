import Joi from "joi";
import { userModel } from "./user.model";
import { NotFound } from "../helpers/error.constructors";
import { createControllerProxy } from "../helpers/controllerProxy";

class UserController {
  async createUser(req, res, next) {
    try {
      const newUser = await userModel.createUser(req.body);

      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    const users = await userModel.findAllUsers();

    return res.status(200).json(users);
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const foundUser = await this.getUserByIdOrThrow(id);

      return res.status(200).json(foundUser);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      await this.getUserByIdOrThrow(id);
      const updatedUser = await userModel.updateUserById(id, req.body);

      return res.status(200).json(updatedUser.value);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await this.getUserByIdOrThrow(id);
      await userModel.deleteUserById(id);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async getUserByIdOrThrow(userId) {
    const userFound = await userModel.findUserById(userId);
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
