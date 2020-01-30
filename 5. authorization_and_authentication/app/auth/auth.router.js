const express = require("express");
const authController = require('./auth.controller');
const authValidation = require('./auth.validation.middleware');

const authRouter = express.Router();

authRouter.post('/sign-up/plain', authValidation.signUpPlain, authController.signUpPlain);
authRouter.post('/sign-in/plain', authValidation.signInPlain, authController.signInPlain);

module.exports = authRouter;
