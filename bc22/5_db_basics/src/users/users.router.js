const { Router } = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { validate } = require("../helpers/validate");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./users.controller");

const router = Router();

// CRUD

const validateIdSchema = Joi.object({
  id: Joi.objectId(),
});

// 1. C - create
// POST /users
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/", validate(createUserSchema), createUser);

// 2. R - read
// GET /users
router.get("/", getUsers);
// GET /users/:id
router.get("/:id", validate(validateIdSchema, "params"), getUserById);

// 3. U - update
// PUT /users/:id
const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
});
router.put(
  "/:id",
  validate(validateIdSchema, "params"),
  validate(updateUserSchema),
  updateUser
);

// 4. D - delete
// DELETE /users/:id
router.delete("/:id", validate(validateIdSchema, "params"), deleteUser);

exports.usersRouter = router;
