import { Router } from "express";
import { usersService } from "./users.service.js";
import Joi from "joi";
import { validate } from "../helpers/validate.js";
import _ from "lodash";
import { composeUsers } from "./users.serializer.js";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const controller = Router();

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
}).min(1);
const userIdSchema = Joi.object({
  id: Joi.objectId(),
});

controller.post(
  "/",
  validate(createUserSchema),
  asyncWrapper(async (req, res) => {
    const newUser = await usersService.createUser(req.body);
    res.status(201).send(composeUsers(newUser));
  })
);

controller.get(
  "/",
  asyncWrapper(async (req, res, next) => {
    const users = await usersService.getUsers();
    res.send(composeUsers(users));
  })
);

controller.get(
  "/:id",
  validate(userIdSchema, 'params'),
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.send(composeUsers(user));
  })
);

controller.patch(
  "/:id",
  validate(userIdSchema, 'params'),
  validate(updateUserSchema),
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updatedUser = await usersService.updateUser(id, req.body);
    res.send(composeUsers(updatedUser));
  })
);

controller.delete(
  "/:id",
  validate(userIdSchema, 'params'),
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await usersService.deleteUser(id);

    res.status(204).send();
  })
);

export const usersController = controller;
