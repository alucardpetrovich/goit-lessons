const { Router } = require("express");
const { serializeUser, serializeUsers } = require("./users.serializers");
const { validate } = require("../../shared/middlewares/validate");
const {
  createUserSchema,
  idSchema,
  updateUserSchema,
} = require("./users.schemas");
const { usersService } = require("./users.service");
const { catchErrors } = require("../../shared/middlewares/catch-errors");

const router = Router();

router.post(
  "/",
  validate(createUserSchema),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. create id for user +
    // 3. save user +
    // 4. send successful response +
    const user = await usersService.create(req.body);
    res.status(201).send(serializeUser(user));
  })
);

router.get(
  "/",
  catchErrors(async (req, res, next) => {
    const users = await usersService.getAll();
    res.status(200).send(serializeUsers(users));
  })
);

router.get(
  "/:id",
  validate(idSchema, "params"),
  catchErrors(async (req, res, next) => {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(serializeUser(user));
  })
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateUserSchema),
  catchErrors(async (req, res, next) => {
    const user = await usersService.updateOne(req.params.id, req.body);
    res.status(200).send(serializeUser(user));
  })
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  catchErrors(async (req, res, next) => {
    await usersService.deleteOne(req.params.id);
    res.status(204).send();
  })
);

exports.usersController = router;
