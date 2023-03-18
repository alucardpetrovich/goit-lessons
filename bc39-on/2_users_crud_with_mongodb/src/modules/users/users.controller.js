const { Router } = require("express");
const { validate } = require("../../shared/middlewares/validation");
const { createUserSchema, userIdSchema } = require("./user.schemas");
const { usersService } = require("./users.service");
const {
  serializeUserResponse,
  serializeUsersListResponse,
} = require("./users.serializers");
const { asyncWrapper } = require("../../shared/middlewares/async-wrapper");

const usersController = Router();

usersController.post(
  "/",
  validate(createUserSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await usersService.createUser(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

usersController.get(
  "/",
  asyncWrapper(async (req, res, next) => {
    const users = await usersService.getUsers();
    res.status(201).send(serializeUsersListResponse(users));
  })
);

usersController.get(
  "/:id",
  validate(userIdSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const user = await usersService.getUserById(req.params.id);
    res.status(201).send(serializeUserResponse(user));
  })
);

exports.usersController = usersController;
