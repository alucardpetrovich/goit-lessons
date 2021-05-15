const { Router } = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { validate } = require("../helpers/validate");
const { usersService } = require("./users.service");
const { composeUsers } = require("./user.serializer");
const { catchWrapper } = require("../helpers/catch-wrapper");

const router = Router();

const validateIdSchema = Joi.object({
  id: Joi.objectId(),
});

// 1. C - Create
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post(
  "/",
  validate(createUserSchema),
  catchWrapper(async (req, res) => {
    const createdUser = await usersService.createUser(req.body);

    res.status(201).send(composeUsers(createdUser));
  })
);

// 2. R - Read
router.get(
  "/",
  catchWrapper(async (req, res) => {
    const users = await usersService.getUsers();

    res.status(200).send(composeUsers(users));
  })
);
router.get(
  "/:id",
  validate(validateIdSchema, "params"),
  catchWrapper(async (req, res) => {
    const user = await usersService.getUser(req.params.id);

    res.status(200).send(composeUsers(user));
  })
);

// 3. U - Update
const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
}).min(1);
router.put(
  "/:id",
  validate(validateIdSchema, "params"),
  validate(updateUserSchema),
  catchWrapper(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);

    res.status(200).send(composeUsers(user));
  })
);

// 4. D - Delete
router.delete(
  "/:id",
  validate(validateIdSchema, "params"),
  catchWrapper(async (req, res) => {
    await usersService.deleteUser(req.params.id);

    res.status(204).send();
  })
);

exports.usersRouter = router;
