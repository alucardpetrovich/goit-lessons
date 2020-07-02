const { Router } = require("express");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { validate } = require("../helpers/validate");
const usersController = require("./users.controller");
const { createControllerProxy } = require("../helpers/controllers.proxy");

const usersControllerProxy = createControllerProxy(usersController);
const router = Router();

const userIdSchema = Joi.object({
  id: Joi.objectId(),
});

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  obj: Joi.object({
    name: Joi.string().allow().required(),
  }).required(),
});
router.post("/", validate(createUserSchema), usersControllerProxy.createUser);

router.get("/", usersControllerProxy.getUsers);
router.get(
  "/:id",
  validate(userIdSchema, "params"),
  usersControllerProxy.getUser
);

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
}).min(1);
router.put(
  "/:id",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  usersControllerProxy.updateUser
);

router.delete(
  "/:id",
  validate(userIdSchema, "params"),
  usersControllerProxy.deleteUser
);

exports.usersRouter = router;
