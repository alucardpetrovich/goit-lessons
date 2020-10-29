const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./users.controller");
const { createUserSchema, updateUserSchema } = require("./users.schemes");

const router = Router();

// CRUD

// 1. C - Create
router.post("/", validate(createUserSchema), createUser);

// 2. R - Read
router.get("/", getUsers);
router.get("/:id", getUserById);

// 3. U - Update
router.put("/:id", validate(updateUserSchema), updateUser);

// 4. D - Delete
router.delete("/:id", deleteUser);

exports.usersRouter = router;
