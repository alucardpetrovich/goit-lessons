const { Router } = require("express");
const { serializeUser, serializeUsers } = require("./users.serializers");
const { validate } = require("../../shared/middlewares/validate");
const { createUserSchema } = require("./users.schemas");
const { usersService } = require("./users.service");

const router = Router();

router.post("/", validate(createUserSchema), (req, res, next) => {
  // 1. validate req body +
  // 2. create id for user +
  // 3. save user +
  // 4. send successful response +
  const user = usersService.create(req.body);
  res.status(201).send(serializeUser(user));
});

router.get("/", (req, res, next) => {
  const users = usersService.getAll();
  res.status(200).send(serializeUsers(users));
});

router.get("/:id", (req, res, next) => {
  const user = usersService.getById(req.params.id);
  res.status(200).send(serializeUser(user));
});

exports.usersController = router;
