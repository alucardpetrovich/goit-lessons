import { Router } from "express";
import { usersService } from "./users.service.js";
import Joi from "joi";
import { validate } from "../helpers/validate.js";
import _ from "lodash";
import { composeUsers } from "./users.serializer.js";

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

controller.post("/", validate(createUserSchema), (req, res) => {
  const newUser = usersService.createUser(req.body);
  res.status(201).send(composeUsers(newUser));
});

controller.get("/", (req, res, next) => {
  const users = usersService.getUsers();
  res.send(composeUsers(users));
});

controller.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);
  if (!user) {
    return res.status(404).send(`User with id ${id} not found`);
  }

  res.send(composeUsers(user));
});

controller.patch("/:id", validate(updateUserSchema), (req, res) => {
  const { id } = req.params;
  const updatedUser = usersService.updateUser(id, req.body);
  res.send(composeUsers(updatedUser));
});

controller.delete("/:id", (req, res) => {
  const { id } = req.params;
  usersService.deleteUser(id);

  res.status(204).send();
});

export const usersController = controller;
