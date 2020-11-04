const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./users.controller");
const {
  createUserSchema,
  updateUserSchema,
  validateIdSchema,
} = require("./users.schemes");

const router = Router();

// CRUD

// 1. C - Create
router.post("/", validate(createUserSchema), createUser);

// 2. R - Read
router.get("/", getUsers);
router.get("/:id", validate(validateIdSchema, "params"), getUserById);

// 3. U - Update
router.put(
  "/:id",
  validate(validateIdSchema, "params"),
  validate(updateUserSchema),
  updateUser
);

// 4. D - Delete
router.delete("/:id", validate(validateIdSchema, "params"), deleteUser);

exports.usersRouter = router;
