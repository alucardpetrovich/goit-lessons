// 1. Init server

const express = require("express");
const Joi = require("@hapi/joi");
const morgan = require("morgan");
const uuid = require("uuid");
const PORT = 3000;

const users = [];

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// C - Create
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
app.post("/users", validate(createUserSchema), createUser);

// R - Read
app.get("/users", getUsers);
app.get("/users/:id", getUser);

// U - Update
const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
}).min(1);
app.put("/users/:id", validate(updateUserSchema), updateUser);

// D - Delete
app.delete("/users/:id", deleteUser);

function createUser(req, res, next) {
  // 1. validate request body { name, email, password } +
  // 2. create unique id +
  // 3. save user in backend +
  // 4. send successfull response (201)

  const id = uuid.v4();

  const newUser = {
    ...req.body,
    id,
  };

  users.push(newUser);

  return res.status(201).send(newUser);
}

function getUsers(req, res, next) {
  console.log("req.query", req.query);
  return res.status(200).send(users);
}

function getUser(req, res, next) {
  const requestedUser = findUser(req.params.id);

  return res.status(200).send(requestedUser);
}

function updateUser(req, res, next) {
  // 1. validate request body +
  // 2. find user with provided id +
  // 3. if user does not exist - return 404 +
  // 4. update user +
  // 5. return successfull response +
  const { id } = req.params;

  findUser(id);

  const userIndex = users.findIndex((user) => user.id === id);
  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  };

  return res.status(200).send(users[userIndex]);
}

function deleteUser(req, res, next) {
  // 1. find user with provided id +
  // 2. if user does not exist - return 404 +
  // 3. delete user +
  // 4. return successfull response +
  const { id } = req.params;

  findUser(id);

  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);

  return res.status(204).send();
}

function validate(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  };
}

function findUser(id) {
  const requestedUser = users.find((user) => user.id === id);
  if (!requestedUser) {
    const err = new Error(`User with id ${id} does not exist`);
    err.status = 404;
    throw err;
  }

  return requestedUser;
}

app.use((err, req, res, next) => {
  const { message, status } = err;

  return res.status(status || 500).send(message);
});

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
