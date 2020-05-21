import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";
Joi.objectId = JoiObjectId(Joi);

import { NotFound } from "../helpers/errorConstructors";
import { UserModel } from "./user.model";

export function validateCreateUser(req, res, next) {
  const body = req.body;

  const userRules = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = userRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

export async function createUser(req, res, next) {
  try {
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const createdUser = await UserModel.createUser(req.body);

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  // 1. return all users in response
  return res.status(200).json(await UserModel.getAllUsers());
}

export async function getUser(req, res, next) {
  // 1. getUser from userDB by id
  // 2. if user not found - return 404 error
  // 3. if user found - send 200 response
  try {
    const userFound = await UserModel.getUserById(req.params.id);
    if (!userFound) {
      throw new NotFound("User not found");
    }

    return res.status(200).json(userFound);
  } catch (err) {
    next(err);
  }
}

export function validateUpdateUser(req, res, next) {
  const toValidate = {
    body: req.body,
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
    body: { username: Joi.string(), email: Joi.string() },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

export async function updateUser(req, res, next) {
  try {
    // 1. validate request body +
    // 2. getUser index from userDB by id +
    // 3. if user not found - return 404 error +
    // 4. if user found - update user +
    // 5. send response with 200 and updated user
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      throw new NotFound("User not found");
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export function validateDeleteUser(req, res, next) {
  const toValidate = {
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

export async function deleteUser(req, res, next) {
  try {
    // 1. getUser index from userDB by id +
    // 2. if user not found - send 404 error +
    // 3. if user found - delete user from usersDB +
    // 4. send 204 response

    const deletedUser = await UserModel.deleteUser(req.params.id);
    if (!deletedUser) {
      throw new NotFound("User not found");
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export function validateGetUser(req, res, next) {
  const toValidate = {
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}
