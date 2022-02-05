const { Router } = require("express");
const { usersService } = require("./users.service");
const { validate } = require("../../middlewares/validate");
const { createUserSchema, updateUserSchema } = require("./users.schemas");
const {
  serializeUserResponse,
  serializeUsersListResponse,
} = require("./users.serializers");

const router = Router();

// 1. C - Create
router.post("/", validate(createUserSchema), (req, res, next) => {
  const user = usersService.createUser(req.body);
  res.status(201).send(serializeUserResponse(user));
});

// 2. R - Read
router.get("/", (req, res, next) => {
  const users = usersService.getUsers();
  res.status(200).send(serializeUsersListResponse(users));
});
router.get("/:id", (req, res, next) => {
  const user = usersService.getUser(req.params.id);
  res.status(200).send(serializeUserResponse(user));
});

// 3. U - Update
router.patch("/:id", validate(updateUserSchema), (req, res, next) => {
  const user = usersService.updateUser(req.params.id, req.body);
  res.status(200).send(serializeUserResponse(user));
});

// 4. D - Delete
router.delete("/:id", (req, res, next) => {
  usersService.deleteUser(req.params.id);
  res.status(204).send();
});

exports.usersRouter = router;
