const { Router } = require("express");
const {
  serializeUserResponse,
  serializeUsersListResponse,
} = require("./users.serializers");
const { validate } = require("../../shared/middlewares/validate");
const { catchErrors } = require("../../shared/middlewares/catch-errors");
const {
  createUserSchema,
  updateUserSchema,
  objectIdSchema,
} = require("./users.schema");
const { usersService } = require("./users.service");

const router = Router();

// C - Create
router.post(
  "/",
  validate(createUserSchema),
  catchErrors(async (req, res, next) => {
    // username, email, password
    // 1. validate req body +
    // 2. create unique user id +
    // 3. save user to DB +
    // 4. serialize response +
    // 5. send successful response +
    const user = await usersService.createUser(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

// R - Read
router.get(
  "/",
  catchErrors(async (req, res, next) => {
    // 1. get users from DB
    // 2. serialize users
    // 3. send successful response
    const users = await usersService.getMany();
    res.status(200).send(serializeUsersListResponse(users));
  })
);
router.get(
  "/:id",
  validate(objectIdSchema, "params"),
  catchErrors(async (req, res, next) => {
    // 1. get user from DB
    // 2. if user does not exist - throw 404
    // 3. if ok - serialize user
    // 4. send successful response
    const user = await usersService.getById(req.params.id);
    res.status(200).send(serializeUserResponse(user));
  })
);

// U - Update
router.patch(
  "/:id",
  validate(objectIdSchema, "params"),
  validate(updateUserSchema),
  catchErrors(async (req, res, next) => {
    // 1. validate req body +
    // 2. check if user exists +
    // 3. if user not found - throw 404 +
    // 4. update user +
    // 5. serialize user
    // 6. send successful response
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(serializeUserResponse(user));
  })
);

// D - Delete
router.delete(
  "/:id",
  validate(objectIdSchema, "params"),
  catchErrors(async (req, res, next) => {
    // 1. check if user exists
    // 2. throw 404 if not
    // 3. delete user if exists
    // 4. send successful response
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  })
);

exports.usersController = router;
