const Joi = require("@hapi/joi");
const userModel = require("./user.model");

exports.validateCreateUser = function validateCreateUser(req, res, next) {
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
};

exports.createUser = function createUser(req, res, next) {
  try {
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const createdUser = userModel.createUser(req.body);

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = function getAllUsers(req, res, next) {
  // 1. return all users in response
  return res.status(200).json(userModel.getAllUsers());
};

exports.getUser = function getUser(req, res, next) {
  // 1. getUser from userDB by id
  // 2. if user not found - return 404 error
  // 3. if user found - send 200 response

  const userFound = findUser(req.params.id);

  return res.status(200).json(userFound);
};

exports.validateUpdateUser = function validateUpdateUser(req, res, next) {
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
};

exports.updateUser = function updateUser(req, res, next) {
  try {
    // 1. validate request body +
    // 2. getUser index from userDB by id +
    // 3. if user not found - return 404 error +
    // 4. if user found - update user +
    // 5. send response with 200 and updated user
    const userId = req.params.id;
    findUser(userId);
    const updatedUser = userModel.updateUser(userId, req.body);

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = function deleteUser(req, res, next) {
  try {
    // 1. getUser index from userDB by id +
    // 2. if user not found - send 404 error +
    // 3. if user found - delete user from usersDB +
    // 4. send 204 response

    const userId = req.params.id;
    findUser(userId);
    userModel.deleteUser(userId);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

function findUser(userId) {
  const userFound = userModel.getUserById(userId);
  if (!userFound) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return userFound;
}
