import { Router } from "express";
import { usersService } from "./users.service.js";
import Joi from "joi";
import { validate } from "../helpers/validate.js";
import _ from "lodash";

const controller = Router();

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

controller.post("/", validate(createUserSchema), (req, res) => {
  const newUser = usersService.createUser(req.body);
  res.status(201).send(_.omit(newUser, "password"));
});

export const usersController = controller;
