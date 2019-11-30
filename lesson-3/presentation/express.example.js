const express = require('express');
const { promises: fsPromises } = require('fs');

const app = express();

const router = express.Router();

router.use(express.static('static'));

router.post('/hello', async (req, res, next) => {
  await fsPromises.writeFile('example.txt', req.query.id);
  res.send();
});

router.get('/hello', async (req, res) => {
  const helloContent = await fsPromises.readFile('example.txt', 'utf8');
  res.send(helloContent);
});

app.use('/products', router);

// app.use((req, res, next) => {
//   console.log('hello');
//   next();
// });

// app.all('/hello', (req, res, next) => {
//   console.log('Hello from all');
//   next();
// });

// app.get('/hello', (req, res, next) => {
//   req.test = 'Test data'
//   next();
//   // next(new Error('Not authorized'));
// }, (req, res, next) => {
//   res.send(req.test);
//   // next();
// });

// app.use((req, res, next) => {
//   res.send('Used');
// });

// app.use((req, res, next) => {
//   const query = req.query;
//   for ( let param in query ) {
//     if ( query[param].includes(',') ) {
//       query[param] = query[param].split(',');
//     }
//   }

//   next();
// });

// app.get('/products/:id', (req, res, next) => {
//   res.send(req.params.id);
// });

// app.get('/products', (req, res, next) => {
//   res.send(req.query);
// });

app.use((err, req, res, next) => {
  delete err.stack;
  next(err);
});

app.listen(3000);
