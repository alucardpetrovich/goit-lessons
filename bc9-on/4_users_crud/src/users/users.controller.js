const { Router } = require("express");
const { validate } = require("../helpers/validate");
const { serializeUsers } = require("./user.serializer");
const { createUserSchema, updateUserSchema } = require("./users.schema");
const { usersService } = require("./users.service");

const router = Router();

createUserSchema.validate({}, { stripUnknown: true });

// 1. C - Create
router.post("/", validate(createUserSchema), (req, res, next) => {
  try {
    const newUser = usersService.createUser(req.body);
    return res.status(201).send(serializeUsers(newUser));
  } catch (err) {
    next(err);
  }
});

// 2. R - Read
router.get("/", (req, res, next) => {
  try {
    const users = usersService.getUsers();
    return res.status(200).send(serializeUsers(users));
  } catch (err) {
    next(err);
  }
});
router.get("/:id", (req, res, next) => {
  try {
    const user = usersService.getUser(req.params.id);
    return res.status(200).send(serializeUsers(user));
  } catch (err) {
    next(err);
  }
});

// 3. U - Update
router.put("/:id", validate(updateUserSchema), (req, res, next) => {
  try {
    const updatedUser = usersService.updateUser(req.params.id, req.body);
    return res.status(200).send(serializeUsers(updatedUser));
  } catch (err) {
    next(err);
  }
});

// 4. D - Delete
router.delete("/:id", (req, res, next) => {
  try {
    usersService.deleteUser(req.params.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

exports.usersController = router;
