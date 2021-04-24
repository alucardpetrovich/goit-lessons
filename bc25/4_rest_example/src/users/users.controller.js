const { Router } = require("express");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { usersService } = require("./users.service");
const { composeUsers } = require("./user.serializer");

const router = Router();

// 1. C - Create
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/", validate(createUserSchema), (req, res) => {
  const createdUser = usersService.createUser(req.body);

  res.status(201).send(composeUsers(createdUser));
});

// 2. R - Read
router.get("/", (req, res) => {
  const users = usersService.getUsers();

  res.status(200).send(composeUsers(users));
});
router.get("/:id", (req, res) => {
  const user = usersService.getUser(req.params.id);

  res.status(200).send(composeUsers(user));
});

// 3. U - Update
const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
}).min(1);
router.put("/:id", validate(updateUserSchema), (req, res) => {
  const user = usersService.updateUser(req.params.id, req.body);

  res.status(200).send(composeUsers(user));
});

// 4. D - Delete
router.delete("/:id", (req, res) => {
  usersService.deleteUser(req.params.id);

  res.status(204).send();
});

exports.usersRouter = router;
