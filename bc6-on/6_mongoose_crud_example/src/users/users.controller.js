const { Router } = require("express");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { validate } = require("../helpers/validate");
const { prepareUser, prepareUsers } = require("./user.serializer");
const {
  createUserSchema,
  updateUserSchema,
  idValidationSchema,
} = require("./users.schemes");
const { usersService } = require("./users.service");

const router = Router();

router.post(
  "/",
  validate(createUserSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await usersService.createUser(req.body);
    return res.status(201).send(prepareUser(user));
  })
);

router.get(
  "/",
  asyncWrapper(async (req, res, next) => {
    const users = await usersService.getUsers();
    return res.status(200).send(prepareUsers(users));
  })
);
router.get(
  "/:id",
  validate(idValidationSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const user = await usersService.getUser(req.params.id);
    return res.status(200).send(prepareUser(user));
  })
);

router.put(
  "/:id",
  validate(idValidationSchema, "params"),
  validate(updateUserSchema),
  asyncWrapper(async (req, res, next) => {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    return res.status(200).send(prepareUser(updatedUser));
  })
);

router.delete(
  "/:id",
  validate(idValidationSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    await usersService.deleteUser(req.params.id);
    return res.status(204).send();
  })
);

exports.usersController = router;
