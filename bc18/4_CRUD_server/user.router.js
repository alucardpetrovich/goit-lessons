const { Router } = require("express");
const Joi = require("@hapi/joi");
const uuid = require("uuid");

// id - string
// username - string
// email - string
// password - string

const usersDB = [];

const usersRouter = Router();

// C - Create
usersRouter.post("/", validateCreateUser, createUser);

// R - Read
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);

// U - Update
usersRouter.put("/:id", validateUpdateUser, updateUser);

// D - Delete
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;

function validateCreateUser(req, res, next) {
  const body = req.body;

  const userRules = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = userRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

function createUser(req, res, next) {
  try {
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const id = uuid.v4();

    const createdUser = {
      ...req.body,
      id,
    };

    usersDB.push(createdUser);

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

function getAllUsers(req, res, next) {
  // 1. return all users in response
  return res.status(200).json(usersDB);
}

function getUser(req, res, next) {
  // 1. getUser from userDB by id
  // 2. if user not found - return 404 error
  // 3. if user found - send 200 response

  const userFound = usersDB.find((user) => user.id === req.params.id);
  if (!userFound) {
    return res.status(404).send("User not found");
  }

  return res.status(200).json(userFound);
}

function validateUpdateUser(req, res, next) {
  const body = req.body;

  const userRules = Joi.object({
    username: Joi.string(),
    email: Joi.string(),
  });

  const validationResult = userRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

function updateUser(req, res, next) {
  try {
    // 1. validate request body +
    // 2. getUser index from userDB by id +
    // 3. if user not found - return 404 error +
    // 4. if user found - update user +
    // 5. send response with 200 and updated user

    const userIndexFound = findUserIndex(req.params.id);

    usersDB[userIndexFound] = {
      ...usersDB[userIndexFound],
      ...req.body,
    };

    return res.status(200).json(usersDB[userIndexFound]);
  } catch (err) {
    next(err);
  }
}

function deleteUser(req, res, next) {
  try {
    // 1. getUser index from userDB by id +
    // 2. if user not found - send 404 error +
    // 3. if user found - delete user from usersDB +
    // 4. send 204 response

    const userIndexFound = findUserIndex(req.params.id);

    usersDB.splice(userIndexFound, 1);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function findUserIndex(userId) {
  const userIndexFound = usersDB.findIndex((user) => user.id === req.params.id);
  if (userIndexFound === -1) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return userIndexFound;
}
