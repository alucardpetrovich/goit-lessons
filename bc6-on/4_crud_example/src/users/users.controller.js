const { Router } = require('express');
const { validate } = require('../helpers/validate');
const { prepareUser, prepareUsers } = require('./user.serializer');
const { createUserSchema, updateUserSchema } = require('./users.schemes');
const { usersService } = require('./users.service');

const router = Router();

router.post('/', validate(createUserSchema), (req, res, next) => {
  const user = usersService.createUser(req.body);
  return res.status(201).send(prepareUser(user));
});

router.get('/', (req, res, next) => {
  const users = usersService.getUsers();
  return res.status(200).send(prepareUsers(users));
});
router.get('/:id', (req, res, next) => {
  const user = usersService.getUser(req.params.id);
  return res.status(200).send(prepareUser(user));
});

router.put('/:id', validate(updateUserSchema), (req, res, next) => {
  const updatedUser = usersService.updateUser(req.params.id, req.body);
  return res.status(200).send(prepareUser(updatedUser));
});

router.delete('/:id', (req, res, next) => {
  usersService.deleteUser(req.params.id);
  return res.status(204).send();
});

exports.usersController = router;
