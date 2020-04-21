const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'static',
  filename: function (req, file, cb) {
    console.log('file', file);
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  }
})

const upload = multer({ storage });

const PORT = 3000;

const app = express();

app.use(express.static('static'));

app.post('/form-data', upload.single('file_example'), (req, res, next) => {
  // console.log('req.file', req.file);
  // console.log('req.body', req.body);

  res.status(200).send();
});

app.listen(PORT, () => {
  console.log('Server started listening on port', PORT);
})
