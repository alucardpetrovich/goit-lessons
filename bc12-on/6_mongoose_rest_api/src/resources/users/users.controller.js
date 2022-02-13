const { Router } = require("express");
const { usersService } = require("./users.service");
const { validate } = require("../../middlewares/validate");
const { catchErrors } = require("../../middlewares/catch-errors");
const {
  createUserSchema,
  updateUserSchema,
  idScheme,
} = require("./users.schemas");
const {
  serializeUserResponse,
  serializeUsersListResponse,
} = require("./users.serializers");

const router = Router();

// 1. C - Create
router.post(
  "/",
  validate(createUserSchema),
  catchErrors(async (req, res, next) => {
    const user = await usersService.createUser(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

// 2. R - Read
router.get(
  "/",
  catchErrors(async (req, res, next) => {
    const users = await usersService.getUsers();
    res.status(200).send(serializeUsersListResponse(users));
  })
);
router.get(
  "/:id",
  validate(idScheme, "params"),
  catchErrors(async (req, res, next) => {
    const user = await usersService.getUser(req.params.id);
    res.status(200).send(serializeUserResponse(user));
  })
);

// 3. U - Update
router.patch(
  "/:id",
  validate(idScheme, "params"),
  validate(updateUserSchema),
  catchErrors(async (req, res, next) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(serializeUserResponse(user));
  })
);

// 4. D - Delete
router.delete(
  "/:id",
  validate(idScheme, "params"),
  catchErrors(async (req, res, next) => {
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  })
);

exports.usersRouter = router;
