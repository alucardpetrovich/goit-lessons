const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');
const questionsRouter = require('./questions/questions.router');

const app = express();

initMiddleware(app);
initRoutes(app);

app.listen(port, () => {
  console.log('Server is running on port', port);
});

function initMiddleware(app) {
  app.use(bodyParser.json());
}

function initRoutes(app) {
  app.use('/questions', questionsRouter);
}
