import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './user/user.router';
import sessionRouter from './session/session.router';

init();

async function init() {
  const app = express();

  await connectToDb(config);

  initMiddleware(app);
  initRouters(app);

  app.listen(config.port, () => {
    console.log('Server started on port', config.port);
  });

}

function initMiddleware(app) {
  app.use(bodyParser.json());
}

function initRouters(app) {
  app.use('/users', userRouter);
  app.use('/sessions', sessionRouter);
}

async function connectToDb(config) {
  const url = config.mongo_db.url;
  await mongoose.connect(url);
}
