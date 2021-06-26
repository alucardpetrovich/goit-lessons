const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { usersController } = require('./users/users.controller');

exports.CrudServer = class {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initConfig();
    // this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initConfig() {
    dotenv.config({ path: path.join(__dirname, '../.env') });
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use('/users', usersController);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT }  = process.env;
    this.server.listen(PORT, () => {
      console.log('Started listening on port', PORT);
    });
  }
}
