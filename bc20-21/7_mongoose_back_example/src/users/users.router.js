// CRUD
const { Router } = require("express");
const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./users.controller");

const router = Router();

const userIdSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.error("Invalid user id. Must be object id");
      }

      return value;
    })
    .required(),
});

// 1. C - Create
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
router.post("/", validate(createUserSchema), createUser);

// 2. R - Read
router.get("/", getUsers);
// /users/1w23
// /users/asdfasdf
router.get("/:userId", validate(userIdSchema, "params"), getUser);

// 3. U - Update
const updateUserSchema = Joi.object({
  email: Joi.string(),
  username: Joi.string(),
}).min(1);
router.put(
  "/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  updateUser
);

// 4. D - Delete
router.delete("/:userId", validate(userIdSchema, "params"), deleteUser);

exports.usersRouter = router;
