const fs = require('fs');

fs.readdir('/Users/punisher/Desktop/goit-lessons/lesson-1', (err, data) => {
  if (err) throw err;

  console.log(data);
});

// const fileContent = fs.readFileSync('/Users/punisher/Desktop/goit-lessons/lesson-1/server_simple.js', 'utf8');
// console.log(fileContent);

// fs.appendFileSync('/Users/punisher/Desktop/goit-lessons/lesson-1/server_simple.js', '\n// Comment');

// fs.writeFile('/Users/punisher/Desktop/goit-lessons/lesson-1/server_simple.js', 'asdfas', (err, data) => {
//   // console.log('write data', data);
// });

// fs.mkdirSync('/Users/punisher/Desktop/goit-lessons/lesson-1/asdf/asdf/asedf', { });

// fs.unlinkSync('/Users/punisher/Desktop/goit-lessons/lesson-1/asdfas.js');

process.on('uncaughtException', (err) => {
  console.log('err', err);
});

