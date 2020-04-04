const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const Joi = require("joi");

const PORT = 3000;
const MONGODB_URL =
  "mongodb+srv://test_admin:3NDTlo02mIHFjVSB@bc17-mongodb-example-bekn8.mongodb.net/test?retryWrites=true&w=majority";
const DB_NAME = "test_db";

let db, usersCollection;

async function main() {
  const server = express();

  const client = await MongoClient.connect(MONGODB_URL);
  db = client.db(DB_NAME);
  usersCollection = db.collection("users");

  server.use(express.json());

  server.post("/users", validateCreateUser, createUser);
  server.get("/users", getUsers);
  server.get("/users/:id", getUserById);
  server.delete("/users/:id", deleteUserById);
  server.put("/users/:id", validateUpdateUser, updateUser);

  server.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
}

function validateCreateUser(req, res, next) {
  const validationRules = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = Joi.validate(req.body, validationRules);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

function validateUpdateUser(req, res, next) {
  const validationRules = Joi.object({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
  });

  const validationResult = Joi.validate(req.body, validationRules);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

async function createUser(req, res, next) {
  try {
    const newUser = await usersCollection.insert(req.body);

    return res.status(201).json(newUser.ops[0]);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await usersCollection.find().toArray();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = req.params.id;

    if (!ObjectID.isValid(userId)) {
      return res.status(404).send();
    }

    const user = await usersCollection.findOne({ _id: new ObjectID(userId) });
    if (!user) {
      return res.status(404).send();
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function deleteUserById(req, res, next) {
  try {
    const userId = req.params.id;

    if (!ObjectID.isValid(userId)) {
      return res.status(404).send();
    }

    const deleteResult = await usersCollection.deleteOne({
      _id: new ObjectID(userId),
    });
    if (!deleteResult.deletedCount) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.id;

    if (!ObjectID.isValid(userId)) {
      return res.status(404).send();
    }

    // 1: user1 + 3   (20)
    // 2: user1 + 4   (20)

    const updateResult = await usersCollection.updateOne(
      {
        _id: new ObjectID(userId),
      },
      {
        $set: req.body,
      }
    );
    if (!updateResult.modifiedCount) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

main();
